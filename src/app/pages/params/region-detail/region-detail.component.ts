import {Component, OnInit} from '@angular/core';
import {CityModel, RegionModel} from "../../../core/models/cityModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../../core/services/params.service";
import Swal from "sweetalert2";
import {latLng, FeatureGroup, LatLngExpression, tileLayer, circle, polygon, marker, icon, Layer, featureGroup, DrawEvents} from 'leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrl: './region-detail.component.css'
})
export class RegionDetailComponent implements OnInit {
  id: number;
  action: string;
  record: RegionModel;
  centerLat: number;
  centerLng: number;
  cities: CityModel[];
  recordForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private paramsService: ParamsService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = 'Edit Region';
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = 'Add Region';
    }
    /**
     * Form Validation
     */
    this.recordForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      inCityId: [0, [Validators.required]]
    });
    this.paramsService.getAllCities().subscribe(x=> {
      this.cities = x;
      this.paramsService.getRegionById(this.id).subscribe(x=> {
        this.record = x;
        this.patchForm();
      });
    })
  }

  patchForm() {
    this.recordForm.patchValue({name: this.record.name});
    this.recordForm.patchValue({inCityId: this.record.inCityId});
    //locate city and zoom there
    this.cities.forEach(c=> {
      if (c.id === this.record.inCityId) {
        this.centerLat = c.center.latitude;
        this.centerLng = c.center.longitude;
        this.zoom = c.zoomLevel;
        this.center = latLng(this.centerLat, this.centerLng);
      }
    });
    const arr: LatLngExpression[][] = [];
    this.record.regionPoints.forEach(r => {
      const latlng = new L.LatLng(r.latitude, r.longitude);
      // @ts-ignore
      arr.push(latlng);
    });

    this.regionArea = polygon(arr);
    this.drawnItems.addLayer(this.regionArea);

  }
  save() {
    if (this.recordForm.valid) {
      if (!this.regionArea || this.drawnItems.getLayers().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Unable to save',
          text: 'You must define an area for the region to be saved!',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      } else {
        let recordModel = new RegionModel();
        recordModel.id = -1;
        recordModel.name = this.recordForm.get('name')?.value;
        recordModel.inCityId = this.recordForm.get('inCityId')?.value;

        if (this.id > 0) {
          recordModel.id = this.id;
        }
        this.paramsService.saveRegion(recordModel, this.regionArea).subscribe(x => {
          Swal.fire({
            icon: 'success',
            title: 'Saved Successfully',
            text: 'Saved Successfully',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: true
          });
          this.router.navigate(['params/region-list']);
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unable to save changes',
        text: 'Unable to save changes',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: true
      });
    }
  }

  regionMap = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    detectRetina: true,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  });

  options = {
    layers: [this.regionMap],
    zoom: 2,
    center: latLng([0, 0])
  };
  mapHeight = 650;
  drawnItems: FeatureGroup = featureGroup();
  zoom = this.options.zoom;
  center = latLng(this.options.center);
  drawOptions = {
    edit: {
      featureGroup: this.drawnItems
    },
    draw: {
      marker : false,
      polyline: false,
      rectangle: false,
      circlemarker: false,
      circle: false
    }
  };
  regionArea: any;

  public onDrawCreated(e: any) {
    this.regionArea = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(this.regionArea);
  }

  public onDrawStart(e: any) {
    if (this.regionArea) {
      this.drawnItems.removeLayer(this.regionArea);
      this.regionArea = null;
    }
  }
}
