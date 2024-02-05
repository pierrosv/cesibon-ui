import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {EstateSimple, RegionModel} from "../../core/models/cityModel";
import {ParamsService} from "../../core/services/params.service";
import {Router} from "@angular/router";
import {EstateService} from "../../core/services/estate.service";
import {AuthenticationService} from "../../core/services/auth.service";

@Component({
  selector: 'app-owner-estate-list',
  templateUrl: './owner-estate-list.component.html',
  styleUrls: ['./owner-estate-list.component.css']
})
export class OwnerEstateListComponent  implements OnInit {
  breadCrumbItems: Array<{}>;
  estates: EstateSimple[];
  regions: RegionModel[];

  constructor(private paramsSrv: ParamsService,
              private estateSrv: EstateService,
              private authSrv: AuthenticationService,
              private router: Router) {
  }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Estates', active: true }];
    this.paramsSrv.getAllRegions().subscribe(x=> {
      this.regions = x;
    })
    this.estateSrv.getOwnerEstates(this.authSrv.getCurrentUserProfile.id).subscribe(x=> {
      this.estates = x;
    });
  }

  editRecord(id: number) {
    this.router.navigate(['owner-estate-editor', id])
  }
}
