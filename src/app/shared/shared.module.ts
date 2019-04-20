import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { PipesModule } from '../pipes/pipes.module';
import { UploadPictureComponent } from '../components/upload-picture/upload-picture.component';

@NgModule({
	declarations: [
		NopagefoundComponent,
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent,
		FooterComponent,
		UploadPictureComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		PipesModule
	],
	exports: [
		NopagefoundComponent,
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent,
		FooterComponent,
		UploadPictureComponent
	]
})
export class SharedModule { }
