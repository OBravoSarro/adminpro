import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserDataInfo } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: UserDataInfo;
  isInvalidForm: boolean;

  constructor(private _user: UserService) { }

  private initForm() {
		this.user = this._user.user.user;

		this.form = new FormGroup({
			name: new FormControl( this.user.name, [Validators.required] ),
			lastname: new FormControl( this.user.lastname, [Validators.required] ),
			email: new FormControl( this.user.email, [Validators.required, Validators.email] )
		});
  }

  saveUserData () {
    if( this.form.invalid ) {
      this.isInvalidForm = true;
			return;
		}
    const user = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      email: this.form.value.email
    };
    this._user.updateUser( user ).subscribe();
  }

  updatePicture (picture) {
    this._user.updateUserPicture(picture);
  }

  ngOnInit() {
    this.initForm();
  }

}
