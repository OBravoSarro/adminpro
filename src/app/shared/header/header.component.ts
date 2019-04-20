import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from "../../services/service.index";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserDataInfo } from '../../models/user.model';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styles: []
})
export class HeaderComponent implements OnInit {
    user = (): UserDataInfo => {
        return this._user.getUserInfo();
    }

    @ViewChild('close') close: ElementRef;
    @ViewChild('input') input: ElementRef;

    constructor(private _user: UserService, private router: Router) {}

    logout() {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to log out?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then(result => {
            if (result.value) {
                this._user.logOutUser();
                this.router.navigate(["/login"]);
            }
        });
    }

    search (terms: string) {
        this.router.navigate(["/search", terms]);
        this.close.nativeElement.click();
        this.input.nativeElement.value = '';
    }

    ngOnInit() {}
}
