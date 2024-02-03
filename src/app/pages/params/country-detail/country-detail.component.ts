import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {CountryModel} from "../../../core/models/country.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../../core/services/params.service";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {
  id: number;
  action: string;
  record: CountryModel;
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
      this.action = 'Add Country';
    }
    /**
     * Form Validation
     */
    this.recordForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      isoCode: ['', [Validators.required]]
    });
    this.paramsService.getCountryById(this.id).subscribe(x=> {
      this.record = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.recordForm.patchValue({name: this.record.name});
    this.recordForm.patchValue({isoCode: this.record.isoCode});
  }
  save() {
    console.log('Saving Person');
    if (this.recordForm.valid) {
      let recordModel = new CountryModel();
      recordModel.id = -1;
      recordModel.name = this.recordForm.get('name')?.value;
      recordModel.isoCode = this.recordForm.get('isoCode')?.value;

      if (this.id > 0 ) {
        recordModel.id = this.id;
      }

      this.paramsService.saveCountry(recordModel).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: 'Saved Successfully',
          text:  'Saved Successfully',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['params/country-list']);
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
