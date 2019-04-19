import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { PAGINATE_SIZE } from 'src/app/config/config';
import { Hospital } from '../../models/hospital.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styles: []
})
export class HospitalListComponent implements OnInit {

  hospitals: Hospital[] = [];
  from: number = 0;
  total: number = 0;
  next: boolean = false;
  totalPages: number = 0;
  loading: boolean = true;
  searchHospitalTxt = new FormControl();
  hospitalFancyData: Hospital;
  searchForm: FormGroup = this.formBuilder.group({
    searchHospitalTxt: this.searchHospitalTxt
  });
  newHospitalText: string = "";

  constructor(private _hospital: HospitalService, private formBuilder: FormBuilder) {
    this.getHospitals();

  }

  ngOnInit() {
    this.searchBook();
  }

  private getHospitals() {
    this.loading = true;
    this._hospital.getHospitals(this.from).subscribe(hospitalData => {
      this.hospitals = [...hospitalData.hospitals];
      this.total = hospitalData.total;
      this.totalPages = Math.ceil(hospitalData.total / PAGINATE_SIZE);
      this.next = this.from < (this.totalPages - 1);
      if((this.from + 1) > this.totalPages){
        this.from = (this.totalPages - 1);
        this.getHospitals();
      }
      this.loading = false;
    });
  }

  pagination (type: string) {
    switch (type) {
      case 'next':
      if (this.next) { this.from += 1; }
        this.getHospitals();
        break;
      case 'prev':
        if (this.from -1 >= 0) { this.from -= 1; }
        this.getHospitals();
        break;

      default:
        return
    }
  }

  private searchHospital (text: string) {
    this.loading = true;
    this._hospital.searchHospital(text).subscribe(hospital => {
      this.hospitals = [...hospital];
      this.total = hospital.length;
      this.totalPages = 1;
      this.from = 0;
      this.next = false;
      this.loading = false;
    });
  }

  searchBook() {
    this.searchHospitalTxt.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(resp => this.searchHospital(resp));
  }

  deleteHospital (hospital: Hospital) {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete hospital ${hospital.name}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete hospital!"
    }).then(result => {
      if (result.value) {
        this.loading = true;
        this._hospital.deleteHospital(hospital).subscribe(() => this.getHospitals());
      }
    });
  }

  updateHospital (hospital: Hospital) {
    this.loading = true;
    this._hospital.updateHospital(hospital).subscribe(() => this.loading = false);
  }

  savePicture (picture: File) {
    this._hospital.updateHospitalPicture(picture, this.hospitalFancyData).then(() => {
      this.getHospitals();
      this.closeFancy();
    });
  }

  openFancy (hospital: Hospital) {
    this.hospitalFancyData = hospital;
  }
  closeFancy () {
    this.hospitalFancyData = null;
  }

  newHospital() {
    Swal.fire({
      title: 'Enter your hospital name',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Name is required'
        } else {
          this.loading = true;
          this._hospital.createHospital(new Hospital(value)).subscribe(
            () => this.getHospitals(),
            () => this.loading = false
          );
        }
      }
    });
  }

}
