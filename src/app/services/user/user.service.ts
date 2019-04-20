import { Injectable } from "@angular/core";
import {
    User,
    UserLogin,
    UserData,
    UserDataInfo
} from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES, PAGINATE_SIZE } from "../../config/config";
import { map, catchError } from 'rxjs/operators';
import Swal from "sweetalert2";
import { Observable, of } from "rxjs";
import { UploadFileService } from "../upload-file/upload-file.service";
import { SidebarService } from '../shared/sidebar.service';

@Injectable({
    providedIn: "root"
})
export class UserService {
    public user: UserData;

    constructor(
        public http: HttpClient,
        private _uploadFileService: UploadFileService,
        private _sidebar: SidebarService
    ) {
        this.setUser();
    }

    private setUser(user?: UserData) {
        if (user) {
            this.user = user;
            this._sidebar.setMenu(user.menu);
            return;
        }
        if (localStorage.getItem("admpUsInf")) {
            this.user = JSON.parse(localStorage.getItem("admpUsInf"));
            this._sidebar.setMenu(this.user.menu);
        }
    }

    private saveStorageUser(resp: UserData, remember: boolean) {
        let userData = {
            id: resp.id,
            token: resp.token,
            user: resp.user,
            menu: resp.menu
        };
        this.setUser(userData);
        userData["remember"] = false;
        if (remember) {
            userData["remember"] = true;
        }
        localStorage.setItem("admpUsInf", JSON.stringify(userData));
    }

    public getUserInfo(): UserDataInfo {
        return this.user.user;
    }

    public createUser(user: User): Observable<User> {
        const url = URL_SERVICES + "/user";
        return this.http.post(url, user).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Created user",
                    text: `The user ${
                        resp.data.email
                    } has been created successfully`,
                    type: "success"
                });
                return resp.data;
            }),
            catchError(err => {
                Swal.fire({
                    title: "Error",
                    text: `${err.error.message}`,
                    type: "error"
                });
                return of(false);
            })
        );
    }

    public updateUser(user): Observable<User> {
        const userId = user.hasOwnProperty('_id') ? user._id : this.user.id;
        const url = `${URL_SERVICES}/user/${userId}?token=${
            this.user.token
        }`;
        user.role = user.hasOwnProperty('role') ? user.role : this.user.user.role;
        return this.http.put(url, user).pipe(
            map((resp: any) => {
                if(this.user.id === resp.user._id){
                    this.user.user = resp.user;
                    this.saveStorageUser(this.user, this.user.remember);
                }
                Swal.fire({
                    title: "Edited user",
                    text: `The user ${
                        resp.user.email
                    } has been edited successfully`,
                    type: "success"
                });
                return resp.data;
            }),
            catchError(err => {
                Swal.fire({
                    title: "Error",
                    text: `${err.error.message}`,
                    type: "error"
                });
                return of(false);
            })
        );
    }

    public updateUserPicture(file: File, user?: UserDataInfo) {
        return new Promise ((resolve, reject) => {


            const userId = (user) ? user._id : this.user.id;
            this._uploadFileService
                .uploadFile(file, "users", userId)
                .then(resp => {
                    if (!user){
                        this.user.user = resp["data"];
                        this.saveStorageUser(this.user, this.user.remember);
                    }
                    Swal.fire({
                        title: "Picture upload successfully",
                        text: `The user image has been updated`,
                        type: "success"
                    });
                    resolve(resp);

                })
                .catch(data => {
                    reject(data);
                });

        });
    }

    public loginUser(user: UserLogin): Observable<boolean> {
        const url = URL_SERVICES + "/login";
        return this.http.post(url, user).pipe(
            map((resp: UserData) => {
                this.saveStorageUser(resp, user.remember);
                return true;
            }),
            catchError(err => {
                Swal.fire({
                    title: "Error",
                    text: `${err.error.message}`,
                    type: "error"
                });
                return of(false);
            })
        );
    }

    public loginGoogleUser(token: string): Observable<boolean> {
        const url = URL_SERVICES + "/login/google";
        return this.http.post(url, { token: token }).pipe(
            map((resp: UserData) => {
                this.saveStorageUser(resp, false);
                return true;
            }),
            catchError(err => {
                Swal.fire({
                    title: "Error",
                    text: `${err.error.message}`,
                    type: "error"
                });
                return of(false);
            })
        );
    }

    public logOutUser() {
        if (localStorage.getItem("admpUsInf")) {
            const user = JSON.parse(localStorage.getItem("admpUsInf"));
            if (user.hasOwnProperty("remember") && user.remember) {
                if (
                    user.hasOwnProperty("user") &&
                    user.user.hasOwnProperty("email") &&
                    user.user.email.length
                ) {
                    const userData = {
                        user: { email: user.user.email },
                        remember: true
                    };
                    localStorage.setItem("admpUsInf", JSON.stringify(userData));
                    return;
                }
            }
        }
        localStorage.removeItem("admpUsInf");
    }

    public getUsers(
        from: number = 0
    ): Observable<{ users: UserDataInfo[]; total: number }> {
        const url = URL_SERVICES + `/user?from=${from}&size=${PAGINATE_SIZE}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return {
                    users: resp.users,
                    total: resp.total
                };
            })
        );
    }

    public searchUser(text: string): Observable<UserDataInfo[]> {
        const url = URL_SERVICES + `/search/users/?search=${text}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.data;
            })
        );
    }
    public deleteUser(user: UserDataInfo): Observable<UserDataInfo> {
        const url = `${URL_SERVICES}/user/${user._id}?token=${this.user.token}`;
        return this.http.delete(url).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Delted user",
                    text: `The user ${user.email} has been deleted successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }
}
