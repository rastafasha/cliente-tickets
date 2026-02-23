import { Component } from '@angular/core';
import { MenuFooterComponent } from "../../../shared/menu-footer/menu-footer.component";
import { HeaderComponent } from '../../../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Payment } from '../../../models/payment';
import { Student } from '../../../models/student';
import { PaymentService } from '../../../services/payment.service';
import { Usuario } from '../../../models/usuario.model';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { StudentService } from '../../../services/student-service.service';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';
import { EventsuserComponent } from "../../../components/eventsuser/eventsuser.component";
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';
import { TicketService } from '../../../services/ticket.service';
import { MisticketsComponent } from '../../../components/mistickets/mistickets.component';
import { MisticketsEnviadosComponent } from '../../../components/mistickets-enviados/mistickets-enviados.component';
import { MisticketsActivosComponent } from "../../../components/mistickets-activos/mistickets-activos.component";
import { MisticketsActShComponent } from "../../../components/mistickets-act-sh/mistickets-act-sh.component";
import { MisticketUsadosComponent } from '../../../components/misticket-usados/misticket-usados.component';
import { Ticket } from '../../../models/ticket';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'app-payment-list',
  imports: [MenuFooterComponent, HeaderComponent,
    FormsModule, ReactiveFormsModule, NgFor, NgIf, LoadingComponent,
    MisticketsComponent, MisticketsEnviadosComponent, MisticketUsadosComponent,
    RouterLink, CommonModule, BackButtnComponent, ImagenPipe, EventsuserComponent, MisticketsActivosComponent, MisticketsActShComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {

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

}
