import { Component, OnInit } from '@angular/core';
import { UserDataInfo } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';
import { PAGINATE_SIZE } from '../../config/config';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  users: UserDataInfo[] = [];
  from: number = 0;
  total: number = 0;
  next: boolean = false;
  totalPages: number = 0;
  loading: boolean = true;
  searchUserTxt = new FormControl();
  userFancyData: UserDataInfo;
  searchForm: FormGroup = this.formBuilder.group({
      searchUserTxt: this.searchUserTxt
  });

  constructor(private _user: UserService, private formBuilder: FormBuilder) {
    this.getUsers();

  }

  ngOnInit() {
    this.searchBook();
  }

  private getUsers() {
    this.loading = true;
    this._user.getUsers(this.from).subscribe(
      usersData => {
        this.users = [...usersData.users];
        this.total = usersData.total;
        this.totalPages = Math.ceil(usersData.total / PAGINATE_SIZE);
        this.next = this.from < (this.totalPages - 1);
        if((this.from + 1) > this.totalPages){
          this.from = (this.totalPages - 1);
          this.getUsers();
        }
        this.loading = false;
      },
      () => this.loading = false
    );
  }

  pagination (type: string) {
    switch (type) {
      case 'next':
      if (this.next) { this.from += 1; }
        this.getUsers();
        break;
      case 'prev':
        if (this.from -1 >= 0) { this.from -= 1; }
        this.getUsers();
        break;

      default:
        return
    }
  }

  private searchUser (text: string) {
    this.loading = true;
    this._user.searchUser(text).subscribe(users => {
      this.users = [...users];
      this.total = users.length;
      this.totalPages = 1;
      this.from = 0;
      this.next = false;
      this.loading = false;
    });
  }

  searchBook() {
    this.searchUserTxt.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(resp => this.searchUser(resp));
  }

  deleteUser (user: UserDataInfo) {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete user ${user.email}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!"
    }).then(result => {
      if (result.value) {
        this.loading = true;
        this._user.deleteUser(user).subscribe(() => this.getUsers());
      }
    });
  }

  isMyUser(id: string) {
    return ( id === this._user.user.id);
  }

  updateUser (user: UserDataInfo) {
    this.loading = true;
    this._user.updateUser(user).subscribe(
      () => this.loading = false,
      () => this.loading = false
    );
  }

  savePicture (picture: File) {
    this._user.updateUserPicture(picture, this.userFancyData).then(() => {
      this.getUsers();
      this.closeFancy();
    });
  }

  openFancy (user: UserDataInfo) {
    this.userFancyData = user;
  }
  closeFancy () {
    this.userFancyData = null;
  }

}
