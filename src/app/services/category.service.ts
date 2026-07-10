import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Evento } from '../models/evento';
const baseUrl = environment.url_servicios;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category!: Category;


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
    const url = `${baseUrl}/categories`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, categories: Category }) => resp.categories)
      );
  }

  getById(id: number): Observable<any> {
    const url = `${baseUrl}/category/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, category: Category }) => resp.category)
      );
  }
  getEventsByCat(id: number): Observable<any> {
    const url = `${baseUrl}/category/events/${id}`;
    return this.http.get<any>(url, this.headers);
  }


  create(category: any) {
     const url = `${baseUrl}/category/store`;
    return this.http.post<any>(url, this.headers);
  }

  update(category: any, id: number) {
    const url = `${baseUrl}/category/update/${id}`;
    return this.http.put<any>(url, this.headers);
  }

  delete(id: number) {
    const url = `${baseUrl}/category/destroy/${id}`;
    return this.http.delete<any>(url, this.headers)
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
