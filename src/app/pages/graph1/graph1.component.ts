import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-graph1',
	templateUrl: './graph1.component.html',
	styles: []
})
export class Graph1Component implements OnInit {

	public graphs:Array<{labels:Array<string>, data:Array<number>, type:string, legend:string}>;

	constructor() {
		this.graphs = [
			{
				'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
				'data':  [24, 30, 46],
				'type': 'doughnut',
				'legend': 'El pan se come con'
			},
			{
				'labels': ['Hombres', 'Mujeres'],
				'data':  [4500, 6000],
				'type': 'doughnut',
				'legend': 'Entrevistados'
			},
			{
				'labels': ['Si', 'No'],
				'data':  [95, 5],
				'type': 'doughnut',
				'legend': '¿Le dan gases los frijoles?'
			},
			{
				'labels': ['No', 'Si'],
				'data':  [85, 15],
				'type': 'doughnut',
				'legend': '¿Le importa que le den gases?'
			}
		];
	}

	ngOnInit() {
	}

}
