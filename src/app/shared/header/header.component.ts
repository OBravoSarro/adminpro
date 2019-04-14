import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _user: UserService, private _router: Router) { }

  logout() {
		Swal.fire({
			title: 'Are you sure?',
			text: "Are you sure you want to log out?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, log out!'
		}).then((result) => {
			if (result.value) {
				this._user.logOutUser();
				this._router.navigate(['/login']);
			}
		})
	}

  ngOnInit() {
  }

}
