import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins():void;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		private router:Router
	) { }

	public login():void{
		this.router.navigate(['/dashboard']);
	}

	ngOnInit() {
		init_plugins();
	}

}
