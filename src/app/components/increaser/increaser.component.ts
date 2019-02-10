import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-increaser',
	templateUrl: './increaser.component.html',
	styles: []
})
export class IncreaserComponent implements OnInit {

	@ViewChild('progressInput') progressInput:ElementRef;

	@Input('increaserValue') increaser:number;
	@Input() progress:number;
	@Input() title:string;

	@Output() changeValue:EventEmitter<number> = new EventEmitter();

	constructor() {}

	public changePercent = (type:number, value?:number):void => {
		if(type == 0 && (this.progress-this.increaser >= 0)){
			this.progress -= this.increaser;
		}else if(type == 1 && (this.progress+this.increaser <= 100)){
			this.progress += this.increaser;
		}else if(type == 3){
			this.progress = (value >= 100) ? 100:(value <= 0) ? 0:value;
			this.progressInput.nativeElement.value = this.progress;
		}else{
			return;
		}
		this.changeValue.emit(this.progress);
		this.progressInput.nativeElement.focus();
	}

	ngOnInit() {

	}

}
