import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	public settings:Settings = {
		themeUrl: 'assets/css/colors/default.css',
		theme: 'default'
	};

	constructor(
		@Inject(DOCUMENT) private document: Document
	) {
		this.getSettings();
	}

	public saveSettings():void{
		localStorage.setItem('settings', JSON.stringify(this.settings));
	}

	private getSettings():void{
		if(localStorage.getItem('settings')){
			this.settings = JSON.parse(localStorage.getItem('settings'));
		}
		this.setTheme(this.settings.theme);
	}

	public setTheme(themeName:string){
		const url:string = `assets/css/colors/${themeName}.css`;
		this.document.getElementById('themeGlobal').setAttribute('href', url);

		this.settings.theme = themeName;
		this.settings.themeUrl = url;

		this.saveSettings();
	}
}

interface Settings {
	themeUrl:string;
	theme:string;
}