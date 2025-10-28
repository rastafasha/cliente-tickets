import { Materia } from "./materia";

export class Calificacion {
    id!:number;
    student_id!:number;
    materia_id!:Materia;
    materia!:Materia;
    grade!:number;
    anio_escolar!:string;
    created_at!:Date;
}