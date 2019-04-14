import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';

declare function init_plugins():void;
import Swal from 'sweetalert2'
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

	form: FormGroup;

	constructor( private _user: UserService, private _router: Router ) {

	}

	private equalFields (field1: string, field2: string){
		return (group: FormGroup) => {

			let fld1 = group.controls[field1].value;
			let fld2 = group.controls[field2].value;

			if( fld1 === fld2 ){
				return null;
			}

			return {
				equalFields: true
			}
		}
	}

	private initForm() {
		this.form = new FormGroup({
			name: new FormControl( null, Validators.required ),
			lastname: new FormControl( null, Validators.required ),
			email: new FormControl( null, [Validators.required, Validators.email] ),
			password: new FormControl( null, Validators.required ),
			password2: new FormControl( null, Validators.required ),
			conditions: new FormControl( false )
		}, { validators: this.equalFields('password', 'password2')});
	}

	private demoData() {
		this.form.setValue({
			name: 'Test001',
			lastname: 'Apellido Test001',
			email: 'test001@test.com',
			password: 'Temp1234',
			password2: 'Temp1234',
			conditions: true
		});
	}

	register() {
		if( this.form.invalid ) {
			return;
		}

		if( !this.form.value.conditions ) {
			Swal.fire({
				title: 'Important', text: 'You must accept the conditions', type: 'warning'
			});
			return;
		}

		const user: User = new User(
			this.form.value.name,
			this.form.value.lastname,
			this.form.value.email,
			this.form.value.password
		);
		this._user.createUser( user )
			.subscribe(() =>  this._router.navigate(['/login']));
	}

	ngOnInit() {
		init_plugins();
		this.initForm();
		this.demoData();
	}

}
