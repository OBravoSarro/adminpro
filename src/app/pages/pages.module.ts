import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DoctorComponent } from './doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		DashboardComponent,
		ProgressComponent,
		Graph1Component,
		IncreaserComponent,
		GraphDonaComponent,
		AccountSettingsComponent,
		PromisesComponent,
		RxjsComponent,
		ProfileComponent,
		UserListComponent,
		HospitalListComponent,
		DoctorListComponent,
		DoctorComponent,
		SearchComponent
	],
	imports: [
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		ChartsModule,
		PipesModule
	],
	exports: [
		DashboardComponent,
		ProgressComponent,
		Graph1Component
	]
})
export class PagesModule { }
