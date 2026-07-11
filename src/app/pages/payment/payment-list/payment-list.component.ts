import { Component, ElementRef, signal, ViewChild, viewChild } from '@angular/core';
import { MenuFooterComponent } from "../../../shared/menu-footer/menu-footer.component";
import { HeaderComponent } from '../../../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';
import { Usuario } from '../../../models/usuario.model';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { EventsuserComponent } from "../../eventos/eventsuser/eventsuser.component";
import { TicketService } from '../../../services/ticket.service';
import { MisticketsActivosComponent } from "../../ticket/mistickets-activos/mistickets-activos.component";
import { Ticket } from '../../../models/ticket';
import { environment } from '../../../../environments/environment';
import { PaymentDetailComponent } from "../payment-detail/payment-detail.component";

declare var bootstrap: any;

@Component({
  selector: 'app-payment-list',
  imports: [MenuFooterComponent, HeaderComponent,
    FormsModule, ReactiveFormsModule, NgIf, LoadingComponent,
    RouterLink, CommonModule, BackButtnComponent, 
    EventsuserComponent, MisticketsActivosComponent,  
    PaymentDetailComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {

  @ViewChild('offcanvasPagoDetail', { static: false }) offcanvasElement!: ElementRef;

  option_selectedd:number = 1;
  solicitud_selectedd:any = null;

    option_selecteddT:number = 1;
  solicitud_selecteddT:any = null;

  pageTitle = 'Historial';
    isLoading = false;
    loading = false;
    usersCount = 0;
    payments!: Payment[]|null;
    event!: any;
  
    p: number = 1;
    count: number = 8;
    userprofile!:Usuario;
    
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
    
    ServerUrl = environment.url_servicios;
    
    tickets!: any[];
    status!:any;
    pagoSeleccionado = signal<any>(null);
    isOpen = signal<boolean>(false);

    constructor(
      private paymentService: PaymentService,
      private ticktService: TicketService,
      private http: HttpClient,
      private authService: AuthService,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
  ngOnInit(): void {
      window.scrollTo(0, 0);
      let USER = localStorage.getItem("user");
    this.userprofile = USER ? JSON.parse(USER) : null;
      
      this.getPayments();
    }

    ngOnChanges(): void {
      if (this.userprofile && this.userprofile.id) {
        this.getPayments();
      }
    }

    getPayments(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      this.paymentService.getPagosbyUser(this.userprofile.id).subscribe(
        (res: any) => {
          this.payments = res;
          // console.log(res)
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
  
    search() {
      return this.paymentService.search(this.query).subscribe((res: any) => {
        this.payments = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getPayments();
      this.query = '';
    }


   optionSelected(value:number){
      this.option_selectedd = value;
      if(this.option_selectedd === 1){

        // this.ngOnInit();
      }
      if(this.option_selectedd === 2){
        this.solicitud_selectedd = null;
      }
      if(this.option_selectedd === 3){
        this.solicitud_selectedd = null;
      }
      if(this.option_selectedd === 4){
        this.solicitud_selectedd = null;
      }
    }

   optionSelectedT(value:number){
      this.option_selecteddT = value;
      if(this.option_selecteddT === 1){

        // this.ngOnInit();
      }
      if(this.option_selecteddT === 2){
        this.solicitud_selecteddT = null;
      }

      if(this.option_selecteddT === 3){
        this.solicitud_selecteddT = null;
      }
    }

    getTicketbyClient(){
      return this.ticktService.getTicketsByClient(this.userprofile.id).subscribe((res: any) => {
      this.tickets = res;
      this.status = res.status;
      this.event = this.tickets.filter((ticket: Ticket) => ticket.status === 'activo').map((ticket: Ticket) => ticket.event) ;

      });
    } 

  verDetallePago(pago: any) {
  this.pagoSeleccionado.set(pago);
  // console.log(pago);

  // Le da tiempo a Angular de renderizar el *ngIf en el DOM
  setTimeout(() => {
    const el = document.getElementById('offcanvasPagoDetail');
    if (el) {
      const bsOffcanvas = new bootstrap.Offcanvas(el);
      bsOffcanvas.show();
    } else {
      console.error('El elemento offcanvasPagoDetail no fue encontrado en el DOM.');
    }
  }, 0);
}

cerrarOffcanvas() {
  this.isOpen.set(false);
}

}
