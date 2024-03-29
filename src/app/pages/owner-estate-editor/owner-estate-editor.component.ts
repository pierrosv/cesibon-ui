import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../core/services/params.service";
import {CityModel, EstateFull, estateTypes, rentalPeriodType, SimplePoint} from "../../core/models/cityModel";
import {EstateService} from "../../core/services/estate.service";

import {latLng, marker} from "leaflet";
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

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private http: HttpClient,
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
      noOfInSuites: [0],
      totalSquareMeters: [0, [Validators.required]],
      askingPrice: [0, [Validators.required]],
      hasLivingRoom: [false],
      hasDiningArea: [false],
      hasParking: [false],
      hasWifi: [false],
      hasKitchen: [false],
      hasKitchenEquipment: [false],
      hasKitchenette: [false],
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
    this.estateForm.patchValue({name: this.estate.name});
    this.estateForm.patchValue({estateType: this.estate.estateType});
    this.estateForm.patchValue({rentalPeriodType: this.estate.rentalPeriodType});
    this.estateForm.patchValue({fromDate: this.estate.fromDate});
    this.estateForm.patchValue({toDate: this.estate.toDate});
    this.estateForm.patchValue({ownerNotes: this.estate.ownerNotes});
    this.estateForm.patchValue({noOfRooms: this.estate.noOfRooms});
    this.estateForm.patchValue({noOfInSuites: this.estate.noOfInSuites});
    this.estateForm.patchValue({totalSquareMeters: this.estate.totalSquareMeters});
    this.estateForm.patchValue({askingPrice: this.estate.askingPrice});
    this.estateForm.patchValue({hasLivingRoom: this.estate.hasLivingRoom});
    this.estateForm.patchValue({hasDiningArea: this.estate.hasDiningArea});
    this.estateForm.patchValue({hasParking: this.estate.hasParking});
    this.estateForm.patchValue({hasWifi: this.estate.hasWifi});
    this.estateForm.patchValue({hasKitchen: this.estate.hasKitchen});
    this.estateForm.patchValue({hasKitchenEquipment: this.estate.hasKitchenEquipment});
    this.estateForm.patchValue({hasKitchenette: this.estate.hasKitchenette});
    this.estateForm.patchValue({hasHeat: this.estate.hasHeat});
    this.estateForm.patchValue({hasWashingMachine: this.estate.hasWashingMachine});
    this.estateForm.patchValue({hasPool: this.estate.hasPool});
    this.estateForm.patchValue({hasBbq: this.estate.hasBbq});
    this.estateForm.patchValue({hasYard: this.estate.hasYard});
    this.estateForm.patchValue({hasGarden: this.estate.hasGarden});
    this.estateForm.patchValue({hasView: this.estate.hasView});
    this.estateForm.patchValue({hasHotWater: this.estate.hasHotWater});
    this.estateForm.patchValue({hasAirCondition: this.estate.hasAirCondition});
    // this.center = latLng(this.record.center.latitude, this.record.center.longitude);
    //this.markerPoint = latLng(this.record.center.latitude, this.record.center.longitude);
  }

  save() {
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
      recordModel.noOfInSuites = this.estateForm.get('noOfInSuites')?.value;
      recordModel.totalSquareMeters = this.estateForm.get('totalSquareMeters')?.value;
      recordModel.askingPrice = this.estateForm.get('askingPrice')?.value;
      recordModel.hasLivingRoom = this.estateForm.get('hasLivingRoom')?.value;
      recordModel.hasDiningArea = this.estateForm.get('hasDiningArea')?.value;
      recordModel.hasParking = this.estateForm.get('hasParking')?.value;
      recordModel.hasWifi = this.estateForm.get('hasWifi')?.value;
      recordModel.hasKitchen = this.estateForm.get('hasKitchen')?.value;
      recordModel.hasKitchenEquipment = this.estateForm.get('hasKitchenEquipment')?.value;
      recordModel.hasKitchenette = this.estateForm.get('hasKitchenette')?.value;
      recordModel.hasHeat = this.estateForm.get('hasHeat')?.value;
      recordModel.hasWashingMachine = this.estateForm.get('hasWashingMachine')?.value;
      recordModel.hasPool = this.estateForm.get('hasPool')?.value;
      if (recordModel.hasPool ===  undefined) {
        recordModel.hasPool = false;
      }
      recordModel.hasBbq = this.estateForm.get('hasBbq')?.value;
      recordModel.hasYard = this.estateForm.get('hasYard')?.value;
      recordModel.hasGarden = this.estateForm.get('hasGarden')?.value;
      recordModel.hasView = this.estateForm.get('hasView')?.value;
      recordModel.hasHotWater = this.estateForm.get('hasHotWater')?.value;
      recordModel.hasAirCondition = this.estateForm.get('hasAirCondition')?.value;

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

  protected readonly estateTypes = estateTypes;
  protected readonly rentalPeriodType = rentalPeriodType;
}

