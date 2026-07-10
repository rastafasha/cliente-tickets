
import { environment } from "../../environments/environment";
import { Pais } from "./pais";
const base_url = environment.url_media;

export class Company {

    id!: number;
    user_id!: number;
    client_id!: number;
    event_id!: number;
    pais_id!: number;
    pais!: Pais;
    name: string = "";
    description: string = "";
    created_at: string = "";
    image: string = "";
    avatar: string = "";
    

    get imagenUrl(){

      if(!this.image){
        return `${base_url}public/no-image.png`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}companies/${this.image}`;
      }else {
        return `${base_url}/no-image.jpg`;
        // return `./assets/img/no-image.jpg`;
      }

    }

}
