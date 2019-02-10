import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-progress',
	templateUrl: './progress.component.html',
	styles: []
})
export class ProgressComponent implements OnInit {

	public progress:Array<number>;

	constructor() {
		this.progress = [50, 25];
	}

	ngOnInit() {
	}

}
