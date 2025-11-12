import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../models/student';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Evento } from '../models/evento';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public user!: Evento;
        public recientes!: Evento;
        public identity!: Evento;
        // public role: Role;
        error!:string;
      
        serverUrl = environment.url_servicios;
      
        constructor(
          private http: HttpClient,
          private router: Router,
          public authService: AuthService,
          ) {
          this.user;
        }
      
      
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
      
        getAll(): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/events";
          return this.http.get(URL, {headers:headers});
      
          
        }
        getActivos(): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/events/activos";
          return this.http.get(URL, {headers:headers});
      
          
        }
        getDestacados(): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/events/destacados";
          return this.http.get(URL, {headers:headers});
      
          
        }
       
        getById(id:number): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/event/show/"+id;
          return this.http.get(URL,{headers:headers});
        }
        
        getPaymentById(id:number): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/event/paymentbyid/"+id;
          return this.http.get(URL,{headers:headers});
        }

        
        eventsbyUser(id:number): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/event/eventsbyuser/"+id;
          return this.http.get(URL,{headers:headers});
        }

        createEvento(evento:Evento) {
           return this.http.post<any>(this.serverUrl + '/event/store/', evento)
               .pipe(
                 catchError(this.handleError)
               );
        
          }
        
      
      
        update(evento:Evento, id: number) {
    return this.http.post<any>(this.serverUrl + '/event/update/' + id, evento)
    .pipe(
      catchError(this.handleError)
    );
  }
  
        updateStatus(data:any, id: number) {
            return this.http.put<any>(baseUrl + '/event/update/status/' + id, data, this.headers)
        
          }
      
        deleteById(event:Evento): Observable<any> {
          const url = `${baseUrl}/event/destroy/${event}`;
          return this.http.delete(url, this.headers)
        }
    
        search(query=''){
        return this.http.get(`${baseUrl}/event/search/buscar`, {params: {buscar: query}})
    
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
