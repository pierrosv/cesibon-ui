import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {ParamsService} from "../../../core/services/params.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {RegionModel} from "../../../core/models/cityModel";

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.css'
})
export class RegionListComponent implements OnInit  {
  enditem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  content?: any;
  total: Observable<number>;
  page: any = 1;
  deleteId: any;
  regions: RegionModel[];
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  constructor(private paramsSrv: ParamsService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Params' }, { label: 'Regions', active: true }];
    this.loadData();
  }

  loadData() {
    this.paramsSrv.getAllRegions().subscribe( x=> {
      this.regions = x;
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
    this.paramsSrv.deleteRegionById(this.deleteId).subscribe(x=> {
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
    this.router.navigate(['params/region-detail', id])
  }

  // pagination
  pagechanged(event: any) {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // this.enditem = event.page * event.itemsPerPage;
    // this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }
}
