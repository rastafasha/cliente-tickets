import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payment } from '../models/payment';
import { environment } from '../environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public payments!: Payment;
  public payment!: Payment;

  info:any = {};
  cargada:boolean = false;

  //datos
  // payments = 'assets/dataSimulada/pago.json';

  constructor(private http: HttpClient) { }

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

  get status(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.payment.status!;
  }
  get validacion(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.payment.validacion!;
  }



  getAll(){
    const url = `${baseUrl}/payment`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
      )
  }

  getPagoById(id:number): Observable<any> {
    const url = `${baseUrl}/payment/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payment: Payment}) => resp.payment)
        );
  }

  create(data:any): Observable<any> {
    const url = `${baseUrl}/payment/store`;
    return this.http.post(url, data, this.headers);
  }

  update(payment:Payment): Observable<any> {
   const url = `${baseUrl}/payment/update/${payment.id}`;
    return this.http.put(url, payment, this.headers);
  }
  updateStatus(data:any, payment_id:any): Observable<any> {
   const url = `${baseUrl}/payment/update/status/${payment_id}`;
    return this.http.put(url, data, this.headers);
  }
  pagarDeuda(data:any, parent_id:any, student_id:number): Observable<any> {
   const url = `${baseUrl}/payment/pay-debt/${parent_id}/${student_id}`;
    return this.http.post(url, data, this.headers);
  }



  deleteFoto(id:number) {
    return this.http.delete(baseUrl + '/payment/delete-foto/' + id);
  }


  delete(id:number): Observable<any> {
    const url = `${baseUrl}/payment/${id}`;
    return this.http.delete(url, this.headers);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByReference(title:string): Observable<any> {
    return this.http.get(`${baseUrl}/payment/?title=${title}`);
  }

  getPagosbyUser(id:number): Observable<any> {

    const url = `${baseUrl}/payment/pagosbyUser/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
        );
  }
  getPagosPendingbyStudent(id:number): Observable<any> {

    const url = `${baseUrl}/payment/pendientesbyStudent/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
        );
  }
  getDeudaPendingbyUser(id:number): Observable<any> {

    const url = `${baseUrl}/payment/debt-by-parent/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean}) => resp)
        );
  }
  getPagosStatusbyUser(parent_id:number): Observable<any> {

    const url = `${baseUrl}/payment/check-debt-status-p/${parent_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean}) => resp)
        );
  }
  getPagosStatusbyUser2(parent_id:number,student_id:number): Observable<any> {

    const url = `${baseUrl}/payment/check-debt-status-p/${parent_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean}) => resp)
        );
  }

   getRecientes(): Observable<any> {
    const url = `${baseUrl}/payment/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
      )
  }

  search(query=''){
    return this.http.get(`${baseUrl}/payment/search`, {params: {buscar: query}})

  }

}