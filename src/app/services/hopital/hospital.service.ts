import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital } from '../..//models/hospital.model';
import { URL_SERVICES, PAGINATE_SIZE } from '../..//config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  	constructor(private http: HttpClient, private _user: UserService, private _uploadFileService: UploadFileService) { }

  	public getHospitals(from: number = 0, size: number = PAGINATE_SIZE): Observable<{ hospitals: Hospital[]; total: number }> {
        const url = `${URL_SERVICES}/hospital?from=${from}&size=${size}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return {
                    hospitals: resp.data,
                    total: resp.total
                };
            })
        );
	}

  	public getHospital(hospitalId): Observable<Hospital> {
        const url = URL_SERVICES + `/hospital/${hospitalId}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.hospital;
            })
        );
    }

  	public createHospital(hospital: Hospital): Observable<Hospital> {
		const url = `${URL_SERVICES}/hospital/?token=${this._user.user.token}`;
		return this.http.post(url, hospital).pipe(
			map((resp: any) => {
				Swal.fire({
					title: "Created hospital",
					text: `The hospital ${resp.data.name} has been created successfully`,
					type: "success"
				});
				return resp.data;
			})
		);
	}

  	public updateHospital(hospital: Hospital): Observable<Hospital> {
		const url = `${URL_SERVICES}/hospital/${hospital._id}?token=${this._user.user.token}`;
		return this.http.put(url, hospital).pipe(
			map((resp: any) => {
				Swal.fire({
					title: "Updated hopital",
					text: `The hospital ${resp.data.name} has been updated successfully`,
					type: "success"
				});
				return resp.data;
			})
		);
	}

  	public deleteHospital(hospital: Hospital): Observable<Hospital> {
		const url = `${URL_SERVICES}/hospital/${hospital._id}?token=${this._user.user.token}`;
		return this.http.delete(url).pipe(
			map((resp: any) => {
				Swal.fire({
					title: "Deleted hopital",
					text: `The hospital ${resp.data.name} has been deleted successfully`,
					type: "success"
				});
				return resp.data;
			})
		);
	}

	public searchHospital(text: string): Observable<Hospital[]> {
        const url = URL_SERVICES + `/search/hospitals/?search=${text}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.data;
            })
        );
	}

	public updateHospitalPicture(file: File, hospital: Hospital) {
        return new Promise ((resolve, reject) => {
            this._uploadFileService
                .uploadFile(file, "hospitals", hospital._id)
                .then(resp => {

                    Swal.fire({
                        title: "Picture upload successfully",
                        text: `The hospital image has been updated`,
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
