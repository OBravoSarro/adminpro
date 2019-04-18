import { Injectable } from "@angular/core";
import { User, UserLogin, UserData, UserDataInfo } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "../../config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
    providedIn: "root"
})
export class UserService {
    public user: UserData;

    constructor(
        public http: HttpClient,
        private _uploadFileService: UploadFileService
    ) {
        this.setUser();
    }

    private setUser(user?: UserData) {
        if (user) {
            this.user = user;
            return;
        }
        if (localStorage.getItem("admpUsInf")) {
            this.user = JSON.parse(localStorage.getItem("admpUsInf"));
        }
    }

    private saveStorageUser(resp: UserData, remember: boolean) {
        let userData = {
            id: resp.id,
            token: resp.token,
            user: resp.user
        };
        this.setUser(userData);
        userData["remember"] = false;
        if (remember) {
            userData["remember"] = true;
        }
        localStorage.setItem("admpUsInf", JSON.stringify(userData));
	}

	public getUserInfo ():UserDataInfo {
		return this.user.user;
	}

    public createUser(user: User): Observable<User> {
        const url = URL_SERVICES + "/user";
        return this.http.post(url, user).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Created user",
                    text: `The user ${resp.data.email} has been created successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }

    public updateUser(user): Observable<User> {
        const url = `${URL_SERVICES}/user/${this.user.id}?token=${this.user.token}`;
        user.role = this.user.user.role;
        return this.http.put(url, user).pipe(
            map((resp: any) => {
                this.user.user = resp.user;
                this.saveStorageUser(this.user, this.user.remember);
                Swal.fire({
                    title: "Edited user",
                    text: `The user ${resp.user.email} has been edited successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }

    public updateUserPicture(file: File) {
        this._uploadFileService
            .uploadFile(file, "users", this.user.id)
            .then((resp) => {
				this.user.user = resp['data'];
                this.saveStorageUser(this.user, this.user.remember);
                Swal.fire({
                    title: "Picture upload successfully",
                    text: `The user image has been updated`,
                    type: "success"
                });
            })
            .catch((data) => {
				console.log(data);
				return (data);
			});
    }

    public loginUser(user: UserLogin): Observable<boolean> {
        const url = URL_SERVICES + "/login";
        return this.http.post(url, user).pipe(
            map((resp: UserData) => {
                this.saveStorageUser(resp, user.remember);
                return true;
            })
        );
    }

    public loginGoogleUser(token: string): Observable<boolean> {
        const url = URL_SERVICES + "/login/google";
        return this.http.post(url, { token: token }).pipe(
            map((resp: UserData) => {
                this.saveStorageUser(resp, false);
                return true;
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
}
