import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../..//models/doctor.model';
import { URL_SERVICES, PAGINATE_SIZE } from '../..//config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
    providedIn: "root"
})
export class DoctorService {

	constructor(private http: HttpClient, private _user: UserService, private _uploadFileService: UploadFileService) { }

    public getDoctors(
        from: number = 0
    ): Observable<{ doctors: Doctor[]; total: number }> {
        const url =
            URL_SERVICES + `/doctor?from=${from}&size=${PAGINATE_SIZE}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return {
                    doctors: resp.data,
                    total: resp.total
                };
            })
        );
    }

    public getDoctor(doctorId: string): Observable<Doctor> {
        const url =
            URL_SERVICES + `/doctor/${doctorId}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.doctor;
            })
        );
    }

    public createDoctor(doctor: Doctor): Observable<Doctor> {
        const url = `${URL_SERVICES}/doctor/?token=${this._user.user.token}`;
        return this.http.post(url, doctor).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Created doctor",
                    text: `The doctor ${
                        resp.data.name
                    } has been created successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }

    public updateDoctor(doctor: Doctor, doctorId: string): Observable<Doctor> {
        const url = `${URL_SERVICES}/doctor/${doctorId}?token=${
            this._user.user.token
        }`;
        return this.http.put(url, doctor).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Updated hopital",
                    text: `The doctor ${
                        resp.data.name
                    } has been updated successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }

    public deleteDoctor(doctor: Doctor): Observable<Doctor> {
        const url = `${URL_SERVICES}/doctor/${doctor._id}?token=${
            this._user.user.token
        }`;
        return this.http.delete(url).pipe(
            map((resp: any) => {
                Swal.fire({
                    title: "Deleted hopital",
                    text: `The doctor ${
                        resp.data.name
                    } has been deleted successfully`,
                    type: "success"
                });
                return resp.data;
            })
        );
    }

    public searchDoctor(text: string): Observable<Doctor[]> {
        const url = URL_SERVICES + `/search/doctors/?search=${text}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.data;
            })
        );
    }

    public updateDoctorPicture(file: File, doctor: Doctor) {
        return new Promise((resolve, reject) => {
            this._uploadFileService
                .uploadFile(file, "doctors", doctor._id)
                .then(resp => {
                    Swal.fire({
                        title: "Picture upload successfully",
                        text: `The doctor image has been updated`,
                        type: "success"
                    });

                    resolve(resp);
                })
                .catch(data => {
                    reject(data);
                });
        });
    }
}
