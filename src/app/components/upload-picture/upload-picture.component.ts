import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styles: []
})
export class UploadPictureComponent implements OnInit {

  @Input('image') image: string;
  @Input('typeImage') typeImage: string;
  @Output() updatePictureEv: EventEmitter<File> = new EventEmitter();
  imgTemp: string | ArrayBuffer;
  pictureToUpload: File;
  @ViewChild('inputUploadFile') inputUploadFile:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  picturSelected (picture: File) {
    if (!picture || picture.type.indexOf('image') < 0) {
      Swal.fire({
        title: "File error",
        text: `Invalid image`,
        type: "error"
      });
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onloadend = () => this.imgTemp = reader.result;
    this.pictureToUpload = picture;
  }

  updatePicture () {
    this.updatePictureEv.emit(this.pictureToUpload);
  }

  actionUpload () {
    this.inputUploadFile.nativeElement.click();
  }

}
