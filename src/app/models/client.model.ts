import { environment } from "../environments/environment";

const base_url = environment.url_media;

export class Client {
    id!: number;
    name: string = "";
    email: string = "";
    password?: string = "";
    surname: string = "";
    token: string = "";
    is_active: number = 0;
    n_doc: number = 0;
    created_at: string = "";
    image: string = "";
    avatar: string = "";
    roles?: any;
        status?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'RETIRED';

    get imagenUrl(){

      if(!this.avatar){
        return `${base_url}clients/no-image.jpg`;
      } else if(this.avatar.includes('https')){
        return this.avatar;
      } else if(this.avatar){
        return `${base_url}clients/${this.avatar}`;
      }else {
        return `${base_url}/no-image.jpg`;
        // return `./assets/img/no-image.jpg`;
      }

    }
  }

  export class ClientsUser {
    id!: number;
    cliente_id!: number;
    user_id!: number;
    
}
