import { Usuario } from "./usuario.model";


export class CalendarioTareas{
    id!:number;
    user_id!:number;
    maestro!:Usuario;
    student_id!:number;
    status!:string;
    title!:string;
    description!:string;
    fecha_entrega!:Date;
}