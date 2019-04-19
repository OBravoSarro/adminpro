import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';

import { ChartsModule } from 'ng2-charts';

import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraphDonaComponent } from '../components/graph-dona/graph-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { UploadPictureComponent } from '../components/upload-picture/upload-picture.component';


@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graph1Component,
		IncreaserComponent,
		GraphDonaComponent,
		UploadPictureComponent,
		AccountSettingsComponent,
		PromisesComponent,
		RxjsComponent,
		ProfileComponent,
		UserListComponent,
		HospitalListComponent,
		DoctorListComponent
	],
	imports: [
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		ChartsModule,
		PipesModule
	],
	exports: [
		DashboardComponent,
		ProgressComponent,
		Graph1Component,
		UploadPictureComponent
	]
})
export class PagesModule { }
