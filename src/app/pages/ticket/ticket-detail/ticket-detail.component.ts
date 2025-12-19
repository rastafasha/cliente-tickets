import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-ticket-detail',
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
    RouterModule,
],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss'
})
export class TicketDetailComponent {
  pageTitle= 'Ticket';
    @Input() ticketSeleccionado!: Ticket;
    isLoading = false;
    option_selectedd:number = 1;
    solicitud_selectedd:any = null;
    ticket!:Ticket;
    error!: string;
    userprofile!:Usuario;
    payments!:any;
    tickets!:any;
    event_id!:any;

    mostrarinfo: boolean = false;
  
    constructor(
      private ticketService: TicketService,
      private authService: AuthService,
      private activatedRoute: ActivatedRoute
    ){}
  
    ngOnInit(){
      window.scrollTo(0,0);
      this.userprofile = this.authService.getUser();
      this.activatedRoute.params.subscribe( ({id}) => this.getTicket(id));
      // this.activatedRoute.params.subscribe( ({id}) => this.getTicketsByClientbyEvent(id));
  
    }
  
  
    getTicket(id:number){
      this.isLoading= true;
      this.ticketService.getTicket(+id).subscribe((resp:any)=>{
        this.ticket = resp;
        this.isLoading = false;
  
      })
    }

    abrirModalInfo(){
    this.mostrarinfo = true;
  }
}
