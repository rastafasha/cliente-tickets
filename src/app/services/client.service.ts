import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public client!: Client;
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


  getClientes() {
    const url = `${baseUrl}/clients`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, clients: Client}) => resp.clients)
      )
  }

  getClient(id:Client) {
    const url = `${baseUrl}/client/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cliente:Client}) => resp.cliente)
        );
  }

  getClientsByUser(user:any) {
    const url = `${baseUrl}/clients/clientes-user/${user}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, clients:Client}) => resp.clients)
      )
  }
 
  getByContactosCliente(user:any) {
    const url = `${baseUrl}/clients/contactos-cliente/${user}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, clientes: any}) => resp)
      )
  }

  invitarCliente(data:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});      
    const URL = baseUrl+'/client/invitarCliente';
    return this.http.post(URL,data, {headers:headers});
  }


  

  addClienttoUser(data:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    const URL = baseUrl+'/clients/addClienttoUser';
    return this.http.post(URL,data, {headers:headers});
  }
 

  update( data:any, parent_id:any,){
          const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
          const URL = baseUrl+'/client/update/'+parent_id;
          return this.http.post(URL,data,{headers:headers});
        }
    

  removeClient(_id: number) {
    const url = `${baseUrl}/clients/removeClientFromUser/${_id}`;
    return this.http.delete(url, this.headers);
  }


    search(query=''){
    return this.http.get(`${baseUrl}/client/search/buscar`, {params: {buscar: query}})

  }
}
