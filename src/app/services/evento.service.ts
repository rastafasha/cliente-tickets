import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Evento } from '../models/evento';
import { environment } from '../../environments/environment';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public user!: Evento;
  public recientes!: Evento;
  public identity!: Evento;
  // public role: Role;
  error!: string;


  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
  ) {
    this.user;
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }




  get headers() {
    return {
      headers: {
        'auth_token': this.token

      }
    }

  }

  getAll(): Observable<any> {

    const url = `${baseUrl}/events`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, eventos: Evento }) => resp.eventos)
      )


  }
  getActivos(): Observable<any> {
    const url = `${baseUrl}/events/activos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, eventos: Evento }) => resp.eventos)
      )


  }
  getDestacados(): Observable<any> {
    const url = `${baseUrl}/events/destacados`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, eventos: Evento }) => resp.eventos)
      )


  }

  getById(id: number): Observable<any> {

    const url = `${baseUrl}/event/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, event: Evento }) => resp.event)
      );
  }

  getPaymentById(id: number): Observable<any> {

    const url = `${baseUrl}/event/paymentbyid/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, evento: Evento }) => resp.evento)
      );

  }




  eventsbyUser(id: number): Observable<any> {

    const url = `${baseUrl}/event/eventsbyuser/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, eventos: Evento }) => resp.eventos)
      );

  }
  eventsbyClient(id: number): Observable<any> {
    const url = `${baseUrl}/event/eventsbyclient/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, eventos: Evento }) => resp.eventos)
      );
  }

  createEvento(evento: Evento) {
    const url = `${baseUrl}/event/store/ ${evento}`;
    return this.http.post<any>(url, this.headers);

  }



  update(evento: Evento, id: number) {
    const url = `${baseUrl}/event/update/ ${id}`;
    return this.http.post<any>(url, this.headers);
  }

  addClienteToEvento(data: any, id: number) {
    const url = `${baseUrl}/event/addcliente/ ${id} ${data}`;
    return this.http.post<any>(url, this.headers);
  }

  updateStatus(data: any, id: number) {
    return this.http.put<any>(baseUrl + '/event/update/status/' + id, data, this.headers)

  }

  deleteById(event: Evento): Observable<any> {
    const url = `${baseUrl}/event/destroy/${event}`;
    return this.http.delete(url, this.headers)
  }

  search(query = '') {
    return this.http.get(`${baseUrl}/event/search/buscar`, { params: { buscar: query } })

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
