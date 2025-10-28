import { Injectable } from '@angular/core';
import { Examen } from '../models/examen';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
const baseUrl = environment.url_servicios;
@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  public examen!: Examen;
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        auth_token: this.token,
      },
    };
  }

  getExamens() {
    const url = `${baseUrl}/examen`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; examenes: Examen }) => resp.examenes));
  }

  getExamen(examen: any) {
    const url = `${baseUrl}/examen/show/${examen}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; examen: Examen }) => resp.examen));
  }

  createExamen(examen: any) {
    const url = `${baseUrl}/examen/store`;
    return this.http.post(url, examen, this.headers);
  }
  getExamensbyStudent(id: number) {
    const url = `${baseUrl}/examen/showstudent/${id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean }) => resp));
  }

  // updateExamen(examen: any, id: number) {
  //   return this.http.put<any>(
  //     baseUrl + '/examen/update/' + id,
  //     examen,
  //     this.headers
  //   );
  // }
  updateExamen(examen:any, id: number) {
      return this.http.put<any>(baseUrl + '/examen/update/' + id, examen, this.headers)
  
    }

  deleteExamen(examen: any) {
    const url = `${baseUrl}/examen/destroy/${examen}`;
    return this.http.delete(url, this.headers);
  }

  search(query = '') {
    return this.http.get(`${baseUrl}/examen/search`, {
      params: { buscar: query },
    });
  }
}
