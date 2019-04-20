import { Injectable } from '@angular/core';
import { UserDataInfo } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search (search: string): Observable<Search> {
    const url = `${URL_SERVICES}/search/all/?search=${search}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
            return {
              users: resp.data.hasOwnProperty('users') ? resp.data.users : [],
              hospitals: resp.data.hasOwnProperty('hospitals') ? resp.data.hospitals : [],
              doctors: resp.data.hasOwnProperty('doctors') ? resp.data.doctors : []
            };
        })
    );
}

}
