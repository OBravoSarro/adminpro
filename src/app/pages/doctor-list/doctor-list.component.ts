import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/service.index';
import { PAGINATE_SIZE } from 'src/app/config/config';
import { Doctor } from '../../models/doctor.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styles: []
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  from: number = 0;
  total: number = 0;
  next: boolean = false;
  totalPages: number = 0;
  loading: boolean = true;
  searchDoctorTxt = new FormControl();
  doctorFancyData: Doctor;
  searchForm: FormGroup = this.formBuilder.group({
    searchDoctorTxt: this.searchDoctorTxt
  });
  newDoctorText: string = "";

  constructor(private _doctor: DoctorService, private formBuilder: FormBuilder) {
    this.getDoctors();

  }

  ngOnInit() {
    this.searchDoctorEv();
  }

  private getDoctors() {
    this.loading = true;
    this._doctor.getDoctors(this.from).subscribe(doctorData => {
      this.doctors = [...doctorData.doctors];
      this.total = doctorData.total;
      this.totalPages = Math.ceil(doctorData.total / PAGINATE_SIZE);
      this.next = this.from < (this.totalPages - 1);
      if((this.from + 1) > this.totalPages){
        this.from = (this.totalPages - 1);
        this.getDoctors();
      }
      this.loading = false;
    });
  }

  pagination (type: string) {
    switch (type) {
      case 'next':
      if (this.next) { this.from += 1; }
        this.getDoctors();
        break;
      case 'prev':
        if (this.from -1 >= 0) { this.from -= 1; }
        this.getDoctors();
        break;

      default:
        return
    }
  }

  private searchDoctor (text: string) {
    this.loading = true;
    this._doctor.searchDoctor(text).subscribe(doctor => {
      this.doctors = [...doctor];
      this.total = doctor.length;
      this.totalPages = 1;
      this.from = 0;
      this.next = false;
      this.loading = false;
    });
  }

  searchDoctorEv() {
    this.searchDoctorTxt.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(resp => this.searchDoctor(resp));
  }

  deleteDoctor (doctor: Doctor) {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete doctor ${doctor.name}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete doctor!"
    }).then(result => {
      if (result.value) {
        this.loading = true;
        this._doctor.deleteDoctor(doctor).subscribe(() => this.getDoctors());
      }
    });
  }

}
