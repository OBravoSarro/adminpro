import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as fromServices from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    fromServices.SettingsService,
    fromServices.SharedService,
    fromServices.SidebarService,
    fromServices.UserService
  ]
})
export class ServiceModule { }
