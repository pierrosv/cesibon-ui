import {Component, OnInit} from '@angular/core';
import {CountryModel} from "../../../core/models/country.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../../core/services/params.service";
import Swal from "sweetalert2";
import {CityModel, SimplePoint} from "../../../core/models/cityModel";
import {DrawEvents, featureGroup, FeatureGroup, icon, latLng, marker, tileLayer} from "leaflet";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.css'
})
export class CityDetailComponent implements OnInit {
  id: number;
  action: string;
  centerLat: number;
  centerLng: number;
  record: CityModel;
  countries: CountryModel[];
  recordForm!: UntypedFormGroup;


  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private paramsService: ParamsService,
    private router: Router) {
  }

  ngOnInit() {
    this.action = 'Edit Country';
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = 'Add City';
    }

    this.recordForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      inCountryId: [0, [Validators.required]],
      zoomLevel: [1],
    });

    this.paramsService.getAllCountries().subscribe(x=> {
      this.countries = x;
    })

    this.paramsService.getCityById(this.id).subscribe(x=> {
      this.record = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.recordForm.patchValue({name: this.record.name});
    this.recordForm.patchValue({inCountryId: this.record.inCountryId});
    this.recordForm.patchValue({zoomLevel: this.record.zoomLevel});
    // this.recordForm.patchValue({longitude: this.record.center.longitude});
    // this.recordForm.patchValue({latitude: this.record.center.latitude});
    this.center = latLng(this.record.center.latitude, this.record.center.longitude);
    this.markerPoint = latLng(this.record.center.latitude, this.record.center.longitude);
    this.regionArea = marker(this.markerPoint);

    this.drawnItems.addLayer(this.regionArea);
    this.centerLat = this.record.center.latitude;
    this.centerLng = this.record.center.longitude;
    this.zoom = this.record.zoomLevel;
  }

  save() {
    if (this.recordForm.valid) {
      let recordModel = new CityModel();
      recordModel.id = -1;
      recordModel.name = this.recordForm.get('name')?.value;
      recordModel.inCountryId = this.recordForm.get('inCountryId')?.value;
      recordModel.zoomLevel = this.recordForm.get('zoomLevel')?.value;
      recordModel.center = new SimplePoint(this.centerLat, this.centerLng);

      if (this.id > 0 ) {
        recordModel.id = this.id;
      }

      this.paramsService.saveCity(recordModel).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: 'Saved Successfully',
          text:  'Saved Successfully',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['params/city-list']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unable to save changes',
        text:  'Unable to save changes',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: true
      });
    }
  }

  cityMap = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    detectRetina: true,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  });

  options = {
    layers: [this.cityMap],
    zoom: 10,
    center: latLng([0, 0])
  };

  mapHeight = 650;
  drawnItems: FeatureGroup = featureGroup();

  zoom = this.options.zoom;
  center = latLng(this.options.center);
  markerPoint = latLng(this.options.center);

  drawOptions = {
    edit: {
      featureGroup: this.drawnItems
    },
    draw: {
      marker : true,
      polyline: false,
      circlemarker: false,
      rectangle: false,
      polygon: false,
      circle: false
    }
  };
  regionArea: any;

  // summit = marker([ 37.446154, 25.368614 ], {
  //   icon: icon({
  //     iconSize: [ 25, 41 ],
  //     iconAnchor: [ 13, 41 ],
  //     iconUrl: 'leaflet/marker-icon.png',
  //     shadowUrl: 'leaflet/marker-shadow.png'
  //   })
  // });
  public onDrawCreated(e: any) {


    this.regionArea = (e as DrawEvents.Created).layer;

    this.centerLat = this.regionArea._latlng.lat;
    this.centerLng = this.regionArea._latlng.lng;
    this.drawnItems.addLayer(this.regionArea);
  }

  public onDrawStart(e: any) {
    if (this.regionArea) {
      this.drawnItems.removeLayer(this.regionArea);
      this.regionArea = null;
    }
  }
}
