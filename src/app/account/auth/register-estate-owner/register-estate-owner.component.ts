import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, EstateOwnerUser} from "../../../core/services/auth.service";
import {UserProfileService} from "../../../core/services/user.service";
import {Store} from "@ngrx/store";
import {Register} from "../../../store/Authentication/authentication.actions";
import Swal from "sweetalert2";
import {em} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-register-estate-owner',
  templateUrl: './register-estate-owner.component.html',
  styleUrls: ['./register-estate-owner.component.css']
})
export class RegisterEstateOwnerComponent implements OnInit {

  signupForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  successmsg: any = false;
  owner: EstateOwnerUser;
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    const email = this.f['email'].value;
    const firstName = this.f['firstName'].value;
    const lastName = this.f['lastName'].value;
    const password = this.f['password'].value;
    this.owner = new EstateOwnerUser();
    this.owner.firstName = firstName;
    this.owner.lastName = lastName;
    this.owner.password = password;
    this.owner.email = email;
    console.log(this.owner);
    this.authenticationService.registerEstateOwner(this.owner).subscribe(x=> {
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
