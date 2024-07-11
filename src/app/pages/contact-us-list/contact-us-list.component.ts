import {Component, OnInit} from '@angular/core';
import {ContactUs} from "../../core/models/cityModel";
import {AdminService} from "../../core/services/admin.service";

@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.css']
})
export class ContactUsListComponent implements  OnInit {
  breadCrumbItems: Array<{}>;
  contactUsList: ContactUs[];

  constructor(private adminSrv: AdminService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact Us List', active: true }];
    this.adminSrv.getContactUsList().subscribe(x=> {
      this.contactUsList = x;
    })
  }

}
