import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.url_media;

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'users'|'payments'|'posts'|'profiles'|'banners'|'clients' |'events'| 'clients'): string {

    if(!img){
      return `assets/images/no-image.jpg`;
    } else if(img.includes('https')){
      return img;
    } else if(img){
      return img;
      // return `${base_url}/${tipo}/${img}`;
    }else {
      return `${base_url}/no-image.png`;
    }


  }

}
