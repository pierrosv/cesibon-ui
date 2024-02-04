import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ParamsService} from "../../../core/services/params.service";
import {CountryModel} from "../../../core/models/country.model";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent implements OnInit  {
  enditem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  content?: any;
  total: Observable<number>;
  page: any = 1;
  deleteId: any;
  countries: CountryModel[];
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  constructor(private paramsSrv: ParamsService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Params' }, { label: 'Countries', active: true }];
    this.loadData();
  }

  loadData() {
    this.paramsSrv.getAllCountries().subscribe( x=> {
      this.countries = x;
    });
  }

  // Delete Data
  confirm(id: any) {
    this.deleteId = id
    this.removeItemModal.show();
  }

  // delete order
  deleteRecord() {
    this.removeItemModal.hide();
    this.paramsSrv.deleteCountryById(this.deleteId).subscribe(x=> {
      if (x) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Deleted',
          text:  'Successfully Deleted',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.loadData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Unable to delete record ',
          text:  'Unable to delete record',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
      }

    });
  }

  searchOrder() {
  }

  editRecord(id: number) {
    this.router.navigate(['params/country-detail', id])
  }

  // pagination
  pagechanged(event: any) {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // this.enditem = event.page * event.itemsPerPage;
    // this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }
}
