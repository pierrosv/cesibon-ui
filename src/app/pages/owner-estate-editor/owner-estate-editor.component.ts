import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../core/services/params.service";
import {CityModel, EstateFull, estateTypes, rentalPeriodType, RoomInfo, SimplePoint} from "../../core/models/cityModel";
import {EstateService} from "../../core/services/estate.service";

import {DrawEvents, featureGroup, FeatureGroup, latLng, marker, tileLayer} from "leaflet";
import Swal from "sweetalert2";
import {AuthenticationService} from "../../core/services/auth.service";

@Component({
  selector: 'app-owner-estate-editor',
  templateUrl: './owner-estate-editor.component.html',
  styleUrls: ['./owner-estate-editor.component.css']
})
export class OwnerEstateEditorComponent  implements OnInit {
  id: number;
  action: string;
  lat: number;
  lng: number;
  cities: CityModel[];
  estate: EstateFull;
  roomNumbers: number[];
  centerLat: number;
  centerLng: number;
  selectedEstateType: number;
  protected readonly estateTypes = estateTypes;
  protected readonly rentalPeriodType = rentalPeriodType;


  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private estateSrv: EstateService,
              private authSrv: AuthenticationService,
              private router: Router) {
  }

  /**
   * Returns form
   */
  get form() {
    return this.estateForm.controls;
  }

  estateForm: UntypedFormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  submit: boolean;
  files: File[] = [];

  ngOnInit() {
    this.action = 'Edit';
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = 'Add';
    }
    this.breadCrumbItems = [{ label: 'Estate' }, { label: this.action + ' Estate', active: true }];

    this.estateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      estateType: [0, [Validators.required]],
      rentalPeriodType: [0, [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      ownerNotes: [''],
      noOfRooms: [0],
      totalSquareMeters: [0, [Validators.required]],
      rentForDay: [false],
      rentForMonth: [false],
      rentForWinterSeason: [false],
      rentForSummerSeason: [false],
      rentForYear: [false],
      rentForCustomPeriod: [false],
      askingPriceForDay: [0],
      askingPriceForMonth: [0],
      askingPriceForWinterSeason: [0],
      askingPriceForSummerSeason: [0],
      askingPriceForYear: [0],
      askingPriceForCustomPeriod: [0],
      hasLivingRoom: [false],
      hasDiningArea: [false],
      hasParking: [false],
      hasWifi: [false],
      hasKitchen: [false],
      hasKitchenEquipment: [false],
      hasHeat: [false],
      hasWashingMachine: [false],
      hasPool: [false],
      hasBbq: [false],
      hasYard: [false],
      hasGarden: [false],
      hasView: [false],
      hasHotWater: [false],
      hasAirCondition: [false]
    });

    this.estateSrv.getEstateById(this.id).subscribe(x=> {
      this.estate = x;
      this.patchForm();
    });
    this.submit = false;
  }

  patchForm() {
    this.selectedEstateType = this.estate.estateType;
    this.estateForm.patchValue({name: this.estate.name});
    this.estateForm.patchValue({estateType: this.estate.estateType});
    this.estateForm.patchValue({rentalPeriodType: this.estate.rentalPeriodType});
    this.estateForm.patchValue({fromDate: this.estate.fromDate});
    this.estateForm.patchValue({toDate: this.estate.toDate});
    this.estateForm.patchValue({ownerNotes: this.estate.ownerNotes});
    this.estateForm.patchValue({noOfRooms: this.estate.noOfRooms});
    this.estateForm.patchValue({totalSquareMeters: this.estate.totalSquareMeters});
    this.estateForm.patchValue({hasLivingRoom: this.estate.hasLivingRoom});
    this.estateForm.patchValue({hasDiningArea: this.estate.hasDiningArea});
    this.estateForm.patchValue({hasParking: this.estate.hasParking});
    this.estateForm.patchValue({hasWifi: this.estate.hasWifi});
    this.estateForm.patchValue({hasKitchen: this.estate.hasKitchen});
    this.estateForm.patchValue({hasKitchenEquipment: this.estate.hasKitchenEquipment});
    this.estateForm.patchValue({hasHeat: this.estate.hasHeat});
    this.estateForm.patchValue({hasWashingMachine: this.estate.hasWashingMachine});
    this.estateForm.patchValue({hasPool: this.estate.hasPool});
    this.estateForm.patchValue({hasBbq: this.estate.hasBbq});
    this.estateForm.patchValue({hasGarden: this.estate.hasGarden});
    this.estateForm.patchValue({hasView: this.estate.hasView});
    this.estateForm.patchValue({hasHotWater: this.estate.hasHotWater});
    this.estateForm.patchValue({hasAirCondition: this.estate.hasAirCondition});
    this.estateForm.patchValue({rentForDay: this.estate.rentForDay});
    this.estateForm.patchValue({rentForMonth: this.estate.rentForMonth});
    this.estateForm.patchValue({rentForWinterSeason: this.estate.rentForWinterSeason});
    this.estateForm.patchValue({rentForSummerSeason: this.estate.rentForSummerSeason});
    this.estateForm.patchValue({rentForYear: this.estate.rentForYear});
    this.estateForm.patchValue({rentForCustomPeriod: this.estate.rentForCustomPeriod});
    this.estateForm.patchValue({askingPriceForDay: this.estate.askingPriceForDay});
    this.estateForm.patchValue({askingPriceForMonth: this.estate.askingPriceForMonth});
    this.estateForm.patchValue({askingPriceForWinterSeason: this.estate.askingPriceForWinterSeason});
    this.estateForm.patchValue({askingPriceForSummerSeason: this.estate.askingPriceForSummerSeason});
    this.estateForm.patchValue({askingPriceForYear: this.estate.askingPriceForYear});
    this.estateForm.patchValue({askingPriceForCustomPeriod: this.estate.askingPriceForCustomPeriod});
    this.estateForm.get('rentForDay').valueChanges.subscribe(() => {
      this.estate.rentForDay = this.estateForm.controls['rentForDay'].value;
    });
    this.estateForm.get('rentForMonth').valueChanges.subscribe(() => {
      this.estate.rentForMonth = this.estateForm.controls['rentForMonth'].value;
    });
    this.estateForm.get('rentForWinterSeason').valueChanges.subscribe(() => {
      this.estate.rentForWinterSeason = this.estateForm.controls['rentForWinterSeason'].value;
    });
    this.estateForm.get('rentForSummerSeason').valueChanges.subscribe(() => {
      this.estate.rentForSummerSeason = this.estateForm.controls['rentForSummerSeason'].value;
    });
    this.estateForm.get('rentForYear').valueChanges.subscribe(() => {
      this.estate.rentForYear = this.estateForm.controls['rentForYear'].value;
    });
    this.estateForm.get('rentForCustomPeriod').valueChanges.subscribe(() => {
      this.estate.rentForCustomPeriod = this.estateForm.controls['rentForCustomPeriod'].value;
    });

    this.estateForm.get('estateType').valueChanges.subscribe(() => {
      this.selectedEstateType = this.estateForm.controls['estateType'].value;
      if (this.selectedEstateType == 10) {
        this.estate.noOfRooms = 1;
      } else if (this.selectedEstateType == 20) {
        this.estate.noOfRooms = 1;
      } else if (this.selectedEstateType == 30) {
        this.estate.noOfRooms = 2;
      } else if (this.selectedEstateType == 40) {
        this.estate.noOfRooms = 3;
      } else if (this.selectedEstateType == 50) {
        this.estate.noOfRooms = 4;
      }
      this.roomNumbers = Array(this.estate.noOfRooms).fill(3).map((x,i)=>i);
      this.estate.rooms = [];
      this.roomNumbers.forEach( x=> {
        let newRoom = new RoomInfo();
        newRoom.roomNo = x+1;
        newRoom.surface = 10;
        this.estate.rooms.push(newRoom);
      });
      this.estateForm.patchValue({noOfRooms: this.estate.noOfRooms});
    });

    this.center = latLng(this.estate.cityCenter.latitude, this.estate.cityCenter.longitude);
    this.markerPoint = latLng(this.estate.coordinates.latitude, this.estate.coordinates.longitude);
    this.regionArea = marker(this.markerPoint);

    this.drawnItems.addLayer(this.regionArea);
    this.centerLat = this.estate.coordinates.latitude;
    this.centerLng = this.estate.coordinates.longitude;
    this.zoom = this.estate.cityZoom;
  }

  save() {
    console.log(this.estateForm.errors);
    console.log(this.estateForm);

    if (this.estateForm.valid) {
      let recordModel = new EstateFull();
      recordModel.id = -1;
      recordModel.estateOwnerId = this.authSrv.getCurrentUserProfile.id;
      console.log(this.authSrv.getCurrentUserProfile.id);
      recordModel.name = this.estateForm.get('name')?.value;
      recordModel.estateType = +this.estateForm.get('estateType')?.value;
      recordModel.rentalPeriodType = +this.estateForm.get('rentalPeriodType')?.value;
      recordModel.fromDate = this.estateForm.get('fromDate')?.value;
      recordModel.toDate = this.estateForm.get('toDate')?.value;
      recordModel.ownerNotes = this.estateForm.get('ownerNotes')?.value;
      recordModel.noOfRooms = this.estateForm.get('noOfRooms')?.value;
      recordModel.totalSquareMeters = this.estateForm.get('totalSquareMeters')?.value;
      recordModel.hasLivingRoom = this.estateForm.get('hasLivingRoom')?.value;
      recordModel.hasDiningArea = this.estateForm.get('hasDiningArea')?.value;
      recordModel.hasParking = this.estateForm.get('hasParking')?.value;
      recordModel.hasWifi = this.estateForm.get('hasWifi')?.value;
      recordModel.hasKitchen = this.estateForm.get('hasKitchen')?.value;
      recordModel.hasKitchenEquipment = this.estateForm.get('hasKitchenEquipment')?.value;
      recordModel.hasHeat = this.estateForm.get('hasHeat')?.value;
      recordModel.hasWashingMachine = this.estateForm.get('hasWashingMachine')?.value;
      recordModel.hasPool = this.estateForm.get('hasPool')?.value;
      if (recordModel.hasPool ===  undefined) {
        recordModel.hasPool = false;
      }
      recordModel.hasBbq = this.estateForm.get('hasBbq')?.value;
      recordModel.hasGarden = this.estateForm.get('hasGarden')?.value;
      recordModel.hasView = this.estateForm.get('hasView')?.value;
      recordModel.hasHotWater = this.estateForm.get('hasHotWater')?.value;
      recordModel.hasAirCondition = this.estateForm.get('hasAirCondition')?.value;
      recordModel.rentForDay = this.estateForm.get('rentForDay')?.value;
      recordModel.rentForMonth = this.estateForm.get('rentForMonth')?.value;
      recordModel.rentForWinterSeason = this.estateForm.get('rentForWinterSeason')?.value;
      recordModel.rentForSummerSeason = this.estateForm.get('rentForSummerSeason')?.value;
      recordModel.rentForYear = this.estateForm.get('rentForYear')?.value;
      recordModel.rentForCustomPeriod = this.estateForm.get('rentForCustomPeriod')?.value;
      recordModel.askingPriceForDay = this.estateForm.get('askingPriceForDay')?.value;
      recordModel.askingPriceForMonth = this.estateForm.get('askingPriceForMonth')?.value;
      recordModel.askingPriceForWinterSeason = this.estateForm.get('askingPriceForWinterSeason')?.value;
      recordModel.askingPriceForSummerSeason = this.estateForm.get('askingPriceForSummerSeason')?.value;
      recordModel.askingPriceForYear = this.estateForm.get('askingPriceForYear')?.value;
      recordModel.askingPriceForCustomPeriod = this.estateForm.get('askingPriceForCustomPeriod')?.value;
      recordModel.coordinates = new SimplePoint(this.centerLat, this.centerLng);

      if (this.id > 0 ) {
        recordModel.id = this.id;
      }

      this.estateSrv.saveEstate(recordModel).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: 'Saved Successfully',
          text:  'Saved Successfully',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['owner-estate-list']);
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

  // validSubmit() {
  //   this.submit = true;
  //   const formData = new FormData();
  //   formData.append('name', this.estateForm.get('name').value);
  //   formData.append('manufacture_name', this.estateForm.get('manufacture_name').value);
  //   formData.append('manufacture_brand', this.estateForm.get('manufacture_brand').value);
  //   formData.append('price', this.estateForm.get('price').value);
  //   // formData.append('image', this.file, this.image);
  //
  //   this.http.post<any>(`http://localhost:8000/api/products`, formData)
  //     .subscribe((data) => {
  //       return data;
  //     });
  // }

  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 100);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }
  ///-- MAP
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

