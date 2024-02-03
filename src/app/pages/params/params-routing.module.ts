import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryListComponent} from "./country-list/country-list.component";
import {CityListComponent} from "./city-list/city-list.component";
import {RegionListComponent} from "./region-list/region-list.component";
import {CountryDetailComponent} from "./country-detail/country-detail.component";
import {CityDetailComponent} from "./city-detail/city-detail.component";
import {RegionDetailComponent} from "./region-detail/region-detail.component";

const routes: Routes = [
  {path: 'country-list', component: CountryListComponent},
  {path: 'city-list', component: CityListComponent},
  {path: 'region-list', component: RegionListComponent},
  {path: 'country-detail/:id', component: CountryDetailComponent},
  {path: 'city-detail/:id', component: CityDetailComponent},
  {path: 'region-detail/:id', component: RegionDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamsRoutingModule {
}
