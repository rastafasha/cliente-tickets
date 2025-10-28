import { Injectable } from '@angular/core';
import { CalendarioTareas } from '../models/calendariotarea';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class CalendariotareaService {

  public calendariotarea!: CalendarioTareas;
  
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
  
    getCalendarioTareas() {
      const url = `${baseUrl}/calendariotarea`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(
          map(
            (resp: { ok: boolean; calendariotareas: CalendarioTareas }) =>
              resp.calendariotareas
          )
        );
    }
  
    getCalendarioTarea(calendariotarea: any) {
      const url = `${baseUrl}/calendariotarea/show/${calendariotarea}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(
          map(
            (resp: { ok: boolean; calendariotarea: CalendarioTareas }) =>
              resp.calendariotarea
          )
        );
    }
  
    getCalendarioTareabyMaestro(id: number) {
      const url = `${baseUrl}/calendariotarea/showmaestro/${id}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(map((resp: { ok: boolean }) => resp));
    }
    getCalendarioTareabyMaestroActivos(id: number) {
      const url = `${baseUrl}/calendariotarea/activos/${id}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(map((resp: { ok: boolean }) => resp));
    }
    
  
  
    search(query = '') {
      return this.http.get(`${baseUrl}/calendariotarea/search`, {
        params: { buscar: query },
      });
    }
}
