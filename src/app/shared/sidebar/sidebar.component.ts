import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserDataInfo } from '../../models/user.model';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: []
})
export class SidebarComponent implements OnInit {
	user: any;
	constructor(
		public sidebarService:SidebarService,
		private _user: UserService,
		private _router: Router
	) {
		this.user = (): UserDataInfo => {
            return this._user.getUserInfo();
        }
	}

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
