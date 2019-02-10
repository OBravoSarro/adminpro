import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-graph-dona',
	templateUrl: './graph-dona.component.html',
	styles: []
})
export class GraphDonaComponent implements OnInit {

	@Input('labels') chartLabels:string[] = [];
	@Input('data') chartData:number[] = [];
	@Input('type') chartType:string = 'doughnut';

	constructor() { }

	ngOnInit() {
	}

}
