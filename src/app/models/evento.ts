
import { environment } from "../../environments/environment";
import { Category } from "./category";
import { Company } from "./company";
import { Pais } from "./pais";

const base_url = environment.url_media;

export class Evento {

    id!: number;
    user_id!: number;
    client_id!: number;
    pais_id!: number;
    company_id!: number;
    catergory_id!: number;
    name: string = "";
    description: string = "";
    company!: Company;
    pais!: Pais;
    category!: Category;
    fecha_inicio!: Date;
    fecha_fin!: Date;
    precio_general: number = 0;
    precio_estudiantes: number = 0;
    precio_especialistas: number = 0;
    created_at: string = "";
    image: string = "";
    avatar: string = "";
    status?: 'PUBLISHED' | 'INACTIVE' | 'FINISHED' | 'RETIRED';
    ticketcount?:number=0;
    tickets_disponibles?:number=0;



    // public get isActive():boolean{
    //     return (this.is_active === 1 ? true: false);
    // }


    get imagenUrl(){

      if(!this.image){
        return `${base_url}events/no-image.jpg`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}events/${this.image}`;
      }else {
        return `${base_url}/no-image.jpg`;
        // return `./assets/img/no-image.jpg`;
      }

    }

}
