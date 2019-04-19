import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public menu:any = [
		{
			title: 'General',
			icon: 'mdi mdi-gauge',
			submenu:[
				{ title: 'Dashboard', url:'/dashboard' },
				{ title: 'ProgressBar', url:'/progress' },
				{ title: 'Graphics', url:'/graph1' },
				{ title: 'Promises', url:'/promises' },
				{ title: 'Rxjs', url:'/rxjs' }
			]
		},
		{
			title: 'Maintenance',
			icon: 'mdi mdi-folder-lock-open',
			submenu: [
				{title: 'Users', url: '/users'},
				{title: 'Hospitals', url: '/hospitals'},
				{title: 'Doctors', url: '/doctors'}
			]
		}
	];

	constructor() { }
}
