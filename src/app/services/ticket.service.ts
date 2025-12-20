import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  
    public ticket!: Ticket;
    
  
    constructor(private http: HttpClient,
        public authService:AuthService
      ) { }
    
      get token():string{
        return localStorage.getItem('token') || '';
      }
    
    
      get headers(){
        return{
          headers: {
            'x-token': this.token
          }
        }
      }
    
    
      getTickets() {
        const url = `${baseUrl}/tickets`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, pubs: Ticket[]}) => resp.pubs)
          )
      }
      
    
      getTicket(_id: number) {
        const url = `${baseUrl}/ticket/show/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
            );
      }
      getTicketShared(_id: number) {
        const url = `${baseUrl}/tickets/shared/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, tickets: Ticket}) => resp.tickets)
            );
      }
      getTicketSAc(_id: number) {
        const url = `${baseUrl}/tickets/tiketsactivos/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, tickets: Ticket}) => resp.tickets)
            );
      }

      getTicketsByClient(_id: number) {
        const url = `${baseUrl}/tickets/client/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, tickets: Ticket[]}) => resp.tickets)
            );
      }
    
      getTicketsByEvent(_id: number) {
        const url = `${baseUrl}/tickets/event/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, tickets: Ticket[]}) => resp.tickets)
            );
      }
      compartirTicket(_id: number, data:any) {
        const url = `${baseUrl}/ticket/compartir/${_id}`;
        return this.http.post<any>(url, data, this.headers)
      }
    
    
}
