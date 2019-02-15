import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

	constructor(
		private settingsService:SettingsService
	) {

	}

	public changeColor(themeData:string, link:any):void{
		this.settingsService.setTheme(themeData);
		this.selectItem(link);
	}

	private selectItem(link:any):void{
		let selectors:any = document.getElementsByClassName('selector working');
		for( let ref of selectors){
			ref.classList.remove('working');
		}
		link.classList.add('working');
	}

	private setCheck(){
		console.log('entra');
		let selectors:any = document.getElementsByClassName('selector');
		for( let ref of selectors){
			if(ref.getAttribute('theme') === this.settingsService.settings.theme){
				ref.classList.add('working');
				break;
			}
		}
	}

	ngOnInit() {
		this.setCheck();
	}

}
