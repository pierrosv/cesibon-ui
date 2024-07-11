import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthenticationService, CompanyRegistration, EstateOwnerUser} from "../../../core/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfileService} from "../../../core/services/user.service";
import {Store} from "@ngrx/store";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent  implements OnInit {

  signupForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  successmsg: any = false;
  company: CompanyRegistration;
  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserProfileService, public store: Store) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      personEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      companyEmail: ['', [Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    this.company = new CompanyRegistration();
    this.company.firstName = this.f['firstName'].value;
    this.company.lastName = this.f['lastName'].value;
    this.company.password = this.f['password'].value;
    this.company.personEmail = this.f['personEmail'].value;
    this.company.companyName = this.f['companyName'].value;
    this.company.companyEmail = this.f['companyEmail'].value;
    console.log(this.company);
    this.authenticationService.registerCompany(this.company).subscribe(x=> {
      Swal.fire({
        icon: 'success',
        title: 'Successfully Registered',
        text: 'Successfully Registered',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: true
      });
      this.router.navigate(['/auth/login']);
    });
    //Dispatch Action
    // this.store.dispatch(Register({ email: email, username: name, password: password }));
  }
}
