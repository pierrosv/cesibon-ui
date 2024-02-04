import {Component, OnInit} from '@angular/core';
import {CountryModel} from "../../../core/models/country.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../../core/services/params.service";
import Swal from "sweetalert2";
import {CityModel} from "../../../core/models/cityModel";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.css'
})
export class CityDetailComponent implements OnInit {
  id: number;
  action: string;
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
    /**
     * Form Validation
     */
    this.recordForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      inCountryId: [0, [Validators.required]]
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
  }
  save() {
    console.log('Saving City');
    if (this.recordForm.valid) {
      let recordModel = new CityModel();
      recordModel.id = -1;
      recordModel.name = this.recordForm.get('name')?.value;
      recordModel.inCountryId = this.recordForm.get('inCountryId')?.value;

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
}
