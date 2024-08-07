import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { CryptoModule } from './crypto/crypto.module';
import { EmailModule } from './email/email.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { BlogModule } from "./blog/blog.module";
import { UtilityModule } from './utility/utility.module';
import { UiModule } from './ui/ui.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MapsModule } from './maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

import { FilemanagerComponent } from './filemanager/filemanager.component';
import { CountryListComponent } from './params/country-list/country-list.component';
import { CountryDetailComponent } from './params/country-detail/country-detail.component';
import { CityDetailComponent } from './params/city-detail/city-detail.component';
import { CityListComponent } from './params/city-list/city-list.component';
import { RegionListComponent } from './params/region-list/region-list.component';
import { RegionDetailComponent } from './params/region-detail/region-detail.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LeafletDrawModule} from "@asymmetrik/ngx-leaflet-draw";
import { OwnerEstateListComponent } from './owner-estate-list/owner-estate-list.component';
import { OwnerEstateEditorComponent } from './owner-estate-editor/owner-estate-editor.component';
import { OwnerEstateViewerComponent } from './owner-estate-viewer/owner-estate-viewer.component';
import {NgxSliderModule} from "ngx-slider-v2";
import { EstateOwnerComponent } from './profile/estate-owner/estate-owner.component';
import { CoreProfileComponent } from './profile/core-profile/core-profile.component';
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgStepperModule} from "angular-ng-stepper";
import {CdkStepperModule} from "@angular/cdk/stepper";
import { RoomEditorComponent } from './owner-estate-editor/room-editor/room-editor.component';
import { HouseEditorComponent } from './owner-estate-editor/house-editor/house-editor.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';

@NgModule({
  declarations: [CalendarComponent, ChatComponent,
    FilemanagerComponent,
    CountryListComponent,
    CountryDetailComponent,
    CityDetailComponent,
    CityListComponent,
    RegionListComponent,
    RegionDetailComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    OwnerEstateListComponent,
    OwnerEstateEditorComponent, OwnerEstateViewerComponent, EstateOwnerComponent, CoreProfileComponent, RoomEditorComponent, HouseEditorComponent, ContactUsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    CryptoModule,
    EcommerceModule,
    EmailModule,
    InvoicesModule,
    HttpClientModule,
    ProjectsModule,
    UIModule,
    TasksModule,
    ContactsModule,
    BlogModule,
    UtilityModule,
    UiModule,
    FormModule,
    TablesModule,
    IconsModule,
    ChartModule,
    WidgetModule,
    MapsModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    LeafletModule,
    LeafletDrawModule,
    NgxSliderModule,
    DropzoneModule,
    NgSelectModule,
    NgStepperModule,
    CdkStepperModule,
    AccordionModule,
    BsDatepickerModule
  ],
})
export class PagesModule { }
