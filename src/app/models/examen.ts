import { Materia } from "./materia";
import { Usuario } from "./usuario.model";

export class Examen{
    id!:number;
    student_id!:number;
        user_id!:number;
        maestro!:Usuario;
        materia_id!:number;
        materia!:Materia;
        title!:string;
        exam_date!:Date;
        puntaje!:number;
        valor_examen!:number;
        created_at!:Date;
        updated_at!:Date;

}