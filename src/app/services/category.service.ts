import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
const baseUrl = environment.url_servicios;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category!: Category;
  
    serverUrl = environment.url_servicios;
  
    constructor(
      private http: HttpClient,
      private router: Router,
      public authService: AuthService
    ) {
    }
  
  
    get token(): string {
      return localStorage.getItem("token") || "";
    }
  
    get headers() {
      return {
        headers: {
          auth_token: this.token,
        },
      };
    }
  
  
    getAll(): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/categories";
      return this.http.get(URL, { headers: headers });
    }
  
    getById(id: number): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/category/show/" + id;
      return this.http.get(URL, { headers: headers });
    }
    getEventsByCat(id: number): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/category/events/" + id;
      return this.http.get(URL, { headers: headers });
    }
   
  
    create(category:any) {
      return this.http
        .post<any>(this.serverUrl + "/category/store", category)
        .pipe(catchError(this.handleError));
    }
  
    update(category:any, id: number) {
      return this.http
        .put<any>(this.serverUrl + "/category/update/" + id, category)
        .pipe(catchError(this.handleError));
    }
  
    delete(id: number) {
      return this.http
        .delete<any>(this.serverUrl + "/category/destroy/" + id)
        .pipe(catchError(this.handleError));
    }
  
  
    search(query = "") {
      return this.http.get(`${baseUrl}/category/search/buscar`, {
        params: { buscar: query },
      });
    }
  
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error("An error occurred:", error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
      }
      // return an observable with a user-facing error message
      return throwError("Something bad happened. Please try again later.");
    }
}
