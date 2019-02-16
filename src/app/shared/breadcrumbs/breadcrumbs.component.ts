import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: []
})
export class BreadcrumbsComponent implements OnInit {

	public title:string;

	constructor(
		private router: Router,
		private titleBrowser: Title,
		private metaBrowser: Meta
	) {
		this.getDataRoute().subscribe((data) => {
			this.title = data.title;
			this.titleBrowser.setTitle(data.title);
			const metaTag: MetaDefinition = {
				name:'description',
				content: 'Description of page '+ data.title
			};
			this.metaBrowser.updateTag(metaTag);
		});
	}

	ngOnInit() {
	}

	private getDataRoute() {
		return this.router.events.pipe(
			filter((event) => event instanceof ActivationEnd),
			filter((event: ActivationEnd) => event.snapshot.firstChild === null),
			map((event: ActivationEnd) => event.snapshot.data)
		);
	}

}
