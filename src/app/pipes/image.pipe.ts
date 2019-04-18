import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, params: {type: string}): string {
    const url = URL_SERVICES + "/img/";
    if (!img) {
      return url + 'users/default';
    }
    if (img.indexOf('googleusercontent') !== -1) {
      return img;
    }
    const result = `${url}${params.type}/${img}`;
    console.log(result);
    return result;
  }

}
