import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';

import { ChartsModule } from 'ng2-charts';

import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraphDonaComponent } from '../components/graph-dona/graph-dona.component';

@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graph1Component,
		IncreaserComponent,
		GraphDonaComponent
	],
	imports: [
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		BrowserModule,
		ChartsModule
	],
	exports: [
		DashboardComponent,
		ProgressComponent,
		Graph1Component
	]
})
export class PagesModule { }
