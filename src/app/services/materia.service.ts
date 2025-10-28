import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  
    public materia!: Materia;
    constructor(private http: HttpClient) { }
    
    get token():string{
      return localStorage.getItem('token') || '';
    }
    
    
      get headers(){
        return{
          headers: {
            'auth_token': this.token
          }
        }
      }
    
    
      getMaterias() {
        const url = `${baseUrl}/materias`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, materias: Materia}) => resp.materias)
          )
      }
    
      getMateria(materia: any) {
        const url = `${baseUrl}/materias/show/${materia}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, materia: Materia}) => resp.materia)
            );
      }
    
    
      createMateria(materia:any) {
        const url = `${baseUrl}/materias/store`;
        return this.http.post(url, materia, this.headers);
      }
    
    
      updateMateria(materia:Materia, id: number) {
        return this.http.put<any>(baseUrl + '/materias/update/' + id, materia, this.headers)
    
      }
    
      deleteMateria(materias: any) {
      const url = `${baseUrl}/materias/destroy/${materias}`;
      return this.http.delete(url, this.headers);
    }
}
