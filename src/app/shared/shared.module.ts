import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [
		NopagefoundComponent,
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent,
		FooterComponent
	],
	exports: [
		NopagefoundComponent,
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent,
		FooterComponent
	]
})
export class SharedModule { }
