import { Injectable } from '@angular/core';
import { Calificacion } from '../models/calificacion';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Materia } from '../models/materia';
import { environment } from '../environments/environment';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  public calificacion!: Calificacion;

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

  getCalificacions() {
    const url = `${baseUrl}/calificaciones`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean; calificaciones: Calificacion }) =>
            resp.calificaciones
        )
      );
  }

  getCalificacion(calificacion: any) {
    const url = `${baseUrl}/calificaciones/show/${calificacion}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean; calificacion: Calificacion }) =>
            resp.calificacion
        )
      );
  }

  getCalificacionsbyStudent(id: number) {
    const url = `${baseUrl}/calificaciones/showstudent/${id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean }) => resp));
  }
  getCalificacionsbyMateriabyStudent(id: number, student_id: number) {
    const url = `${baseUrl}/calificaciones/showmateria/${id}/${student_id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean }) => resp));
  }

  createCalificacion(calificacion: any) {
    const url = `${baseUrl}/calificaciones/store`;
    return this.http.post(url, calificacion, this.headers);
  }

  updateCalificacion(calificacion: Calificacion, id: number) {
    return this.http.put<any>(
      baseUrl + '/calificaciones/update/' + id,
      calificacion,
      this.headers
    );
  }

  deleteCalificacion(calificaciones: any) {
    const url = `${baseUrl}/calificaciones/destroy/${calificaciones}`;
    return this.http.delete(url, this.headers);
  }

  search(query = '') {
    return this.http.get(`${baseUrl}/calificaciones/search`, {
      params: { buscar: query },
    });
  }
}
