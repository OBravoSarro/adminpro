import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from "../../services/hopital/hospital.service";
import { Doctor } from "../../models/doctor.model";
import { DoctorService } from "../../services/doctor/doctor.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-doctor",
    templateUrl: "./doctor.component.html",
    styles: []
})
export class DoctorComponent implements OnInit {
    form: FormGroup;
    doctor: Doctor;
    hospitals: Hospital[] = [];
    hospital: Hospital;
    isInvalidForm: boolean;

    constructor(
        private _doctor: DoctorService,
        private _hospital: HospitalService,
        private router: Router,
        private activateRoute: ActivatedRoute
    ) {
        this._hospital
            .getHospitals(0, 0)
            .subscribe(hospitals => (this.hospitals = hospitals.hospitals));
        this.initForm();
        this.activateRoute.params.subscribe(params => {
          if (params.hasOwnProperty('id')){
            const id = params.id;
            this.getDoctor(id);
          }
        });
    }

    private initForm(doctor?: Doctor) {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            hospital: new FormControl('', [Validators.required])
        });
    }

    private getDoctor(doctorId: string) {
      this._doctor.getDoctor(doctorId).subscribe( doctor => {
        this.doctor = doctor;
        this.form.controls['name'].setValue(doctor.name);
        this.form.controls['hospital'].setValue(doctor.hospital._id);
        this.changeHospital(doctor.hospital._id);
      });
    }

    private createDoctor() {
        if (this.form.invalid) {
            this.isInvalidForm = true;
            return;
        }
        const doctor = {
            name: this.form.value.name,
            hospital: this.form.value.hospital
        };
        this._doctor
            .createDoctor(doctor)
            .subscribe(doctor =>
                this.router.navigate(["/doctors", doctor._id])
            );
    }

    private updateDoctor() {
        if (this.form.invalid) {
            this.isInvalidForm = true;
            return;
        }
        const doctor = {
            name: this.form.value.name,
            hospital: this.form.value.hospital
        };
        this._doctor.updateDoctor(doctor, this.doctor._id).subscribe();
    }

    saveDoctor() {
      return (this.doctor) ? this.updateDoctor() : this.createDoctor();
    }

    updatePicture(picture) {
        this._doctor.updateDoctorPicture(picture, this.doctor);
    }

    changeHospital(hospitalId: string) {
        if (hospitalId.length) {
            this._hospital
                .getHospital(hospitalId)
                .subscribe(hospital => (this.hospital = hospital));
        } else {
            this.hospital = null;
        }
    }

    ngOnInit() {

    }
}
