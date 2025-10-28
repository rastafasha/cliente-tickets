import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public user!: Student;
      public recientes!: Student;
      public identity!: Student;
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
    
      
    
    
      get headers(){
        return{
          headers: {
            'auth_token': this.token
    
          }
        }
    
      }
    
      getAll(): Observable<any> {
    
        let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
        let URL = this.serverUrl+"/students";
        return this.http.get(URL, {headers:headers});
    
        
      }
     
      getUserById(id:number): Observable<any> {
    
        let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
        let URL = this.serverUrl+"/student/show/"+id;
        return this.http.get(URL,{headers:headers});
      }
      getPaymentById(id:number): Observable<any> {
    
        let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
        let URL = this.serverUrl+"/student/paymentbyid/"+id;
        return this.http.get(URL,{headers:headers});
      }
      getByParentId(id:number): Observable<any> {
    
        let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
        let URL = this.serverUrl+"/student/byparent/"+id;
        return this.http.get(URL,{headers:headers});
      }
    
      createStudent(data:any){
          const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          const URL = baseUrl+'/student/store';
          return this.http.post(URL,data, {headers:headers});
        }
    
      update(data: any, student_id:number) {
        const url = `${baseUrl}/student/update/${student_id}`;
        return this.http.post(url, data, this.headers);
      }
    
      deleteById(id:number): Observable<any> {
        const url = `${baseUrl}/student/destroy/${id}`;
        return this.http.delete(url, this.headers)
      }
  
      search(query=''){
      return this.http.get(`${baseUrl}/student/search/buscar`, {params: {buscar: query}})
  
    }
}
