import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public menu: Menu[] = [];

	constructor() { }

	setMenu(menu: Menu[]){
		this.menu = menu;
	}
}
