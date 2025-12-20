import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/evento';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { PaymentService } from '../../../services/payment.service';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { Payment } from '../../../models/payment';
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-evento-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    TranslateModule,
    // NgFor,
    // MenuFooterComponent,
    // HeaderComponent,
    BackButtnComponent,
    ImagenPipe,
    RouterModule,
    TicketCardComponent
],
  templateUrl: './evento-detail.component.html',
  styleUrl: './evento-detail.component.scss'
})
export class EventoDetailComponent {
  pageTitle= 'Evento';
  @Input() profileSeleccionado!: Evento;
  isLoading = false;
  option_selectedd:number = 1;
  solicitud_selectedd:any = null;
  evento!:Evento;
  error!: string;
  userprofile!:Usuario;
  payments!:any;
  tickets!:any;
  event_id!:any;

  constructor(
    private eventoService: EventoService,
    private paymentService: PaymentService,
    private ticketService: TicketService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    window.scrollTo(0,0);
     let USER = localStorage.getItem("user");
    this.userprofile = USER ? JSON.parse(USER) : null;

    this.getStudents();
    this.activatedRoute.params.subscribe( ({id}) => this.getEvento(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getTicketsByClientbyEvent(id));

  }

  getEvento(id:number){
    this.isLoading= true;
    this.eventoService.getById(id).subscribe(
      res=>{
        this.evento = res.event;
        this.event_id = this.evento.id;
        this.isLoading = false;
        this.getTicketsByClientbyEvent();
      }
      
    )
  }

  // getPaymentbyClientbyEvent(id:number){
  //   this.isLoading= true;
  //   this.paymentService.getPaymentByEventbyClientId(id, this.userprofile.id).subscribe((resp:any)=>{
  //     this.payments = resp.payments;
  //     this.isLoading = false;


  //   })
  // }

  getTicketsByClientbyEvent(){
    this.isLoading= true;
    this.ticketService.getTicketsByEvent(this.event_id, this.userprofile.id).subscribe((resp:any)=>{
      this.tickets = resp;
      this.isLoading = false;

    })
  }


  optionSelected(value:number){
      this.option_selectedd = value;
      if(this.option_selectedd === 1){

        // this.ngOnInit();
      }
      if(this.option_selectedd === 2){
        this.solicitud_selectedd = null;
      }
    }

    getStudents(): void {
      if (!this.profileSeleccionado || !this.profileSeleccionado.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      
    }

}
