import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Parent } from '../models/parents';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class ParentService {

   public user!: Parent;
    public recientes!: Parent[];
    public identity!: Parent;
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
      return localStorage.getItem('auth_token') || '';
    }
  
    get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST' {
      return this.user.role!;
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
      let URL = this.serverUrl+"/parents";
      return this.http.get(URL, {headers:headers});
  
      
    }
   
    getUserById(id:number): Observable<any> {
  
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/parent/show/"+id;
      return this.http.get(URL,{headers:headers});
  
  
    }
  
  
    
    update( data:any, parent_id:any,){
        const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
        const URL = baseUrl+'/parent/update/'+parent_id;
        return this.http.post(URL,data,{headers:headers});
      }
  
    deleteById(user:any): Observable<any> {
      const url = `${baseUrl}/parent/destroy/${user}`;
      return this.http.delete(url, this.headers)
    }

    search(query=''){
    return this.http.get(`${baseUrl}/parent/search/buscar`, {params: {buscar: query}})

  }
}
