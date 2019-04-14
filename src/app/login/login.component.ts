import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin } from '../models/user.model';
import { NgZone } from '@angular/core';

declare function init_plugins():void;
declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	isInvalidForm: boolean;
	auth2: any;

	constructor( private _user: UserService, private _router: Router, private ngZone: NgZone ) {

	}

	private initForm() {
		let email = null;
		let remember = false;

		if(JSON.parse(localStorage.getItem('admpUsInf'))) {
			const user = JSON.parse(localStorage.getItem('admpUsInf'));
			if(user.hasOwnProperty('remember') && user.remember){
				console.log(user.user.email);
				if(user.hasOwnProperty('user') && user.user.hasOwnProperty('email') && user.user.email.length){
					email = user.user.email;
					remember = true;
				}
			}
		}

		this.form = new FormGroup({
			email: new FormControl( email, [Validators.required, Validators.email] ),
			password: new FormControl( null, Validators.required ),
			remember: new FormControl( remember )
		});
	}

	login() {
		if( this.form.invalid ) {
			this.isInvalidForm = true;
			return;
		}
		const user: UserLogin = new UserLogin(
			this.form.value.email,
			this.form.value.password,
			(this.form.value.remember) ? true:false
		);
		this._user.loginUser( user )
			.subscribe(() =>  this._router.navigate(['/dashboard']));
	}

	private googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '243517311864-ojvk7n07o6aoen1n3io8gmc29eggje5s.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});
			this.attachSignin(document.getElementById('btnGoogle'));
		})
	}

	attachSignin(element) {
		this.auth2.attachClickHandler(element, {}, (googleUser) => {
			// let profile = googleUser.getBasicProfile();
			const token = googleUser.getAuthResponse().id_token;
			this.ngZone.run( () => {
				this._user.loginGoogleUser(token)
					.subscribe(() =>  this._router.navigate(['/dashboard']));
			});
		});
	}

	ngOnInit() {
		init_plugins();
		this.googleInit();
		this.initForm();
	}

}
