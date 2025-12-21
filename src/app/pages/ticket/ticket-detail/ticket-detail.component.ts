import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ClientService } from '../../../services/client.service';
// import { QRCodeComponent } from 'angular2-qrcode';
import { QRCodeComponent } from 'angularx-qrcode';
@Component({
  selector: 'app-ticket-detail',
  standalone: true,
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
    QRCodeComponent
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
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
    ticket_client_id!:any;
    client!:any;
    public myQrCodeValue :string = 'Initial QR code value';

    mostrarinfo: boolean = false;


    //vcard
  vCardInfo!:string;
  value!: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href? : string;
  vcard!: string;
  errors:any = null;
  
    constructor(
      private ticketService: TicketService,
      private clientService: ClientService,
      private authService: AuthService,
      private activatedRoute: ActivatedRoute
    ){}
  
    ngOnInit(){
      window.scrollTo(0,0);
     let USER = localStorage.getItem("user");
    this.userprofile = USER ? JSON.parse(USER) : null;
      this.activatedRoute.params.subscribe( ({id}) => this.getTicket(id));
      // this.activatedRoute.params.subscribe( ({id}) => this.getTicketsByClientbyEvent(id));
  
    }
  
  
    getTicket(id:number){
      this.isLoading= true;
      this.ticketService.getTicket(+id).subscribe((resp:any)=>{
        this.ticket = resp;
        this.isLoading = false;
        this.ticket_client_id= this.ticket.client_id;
        this.client = this.ticket.client;
        
        this.myQrCodeValue = this.ticket.qr_code;
        // this.myQrCodeValue = 'http://api.qrserver.com/v1/create-qr-code/?data=${this.ticket.qr_code}&size=200x200'; //genera una imagen de qr
        // this.myQrCodeValue = 'https://ticketapp.malcolmcordova.com/admin/dashboard/cliente/detail/'+ this.ticket.client_id; //envia a la url del cliente
        console.log(this.myQrCodeValue)
        this.getUser();
  
      })

      
    }

    getUser(){
      this.clientService.getClient(this.ticket_client_id).subscribe((resp:any)=>{
        this.client = resp; 
      })
    }

    abrirModalInfo(){
    this.mostrarinfo = true;
  }


   /**
   * @method: Descarga la imagen del qr
   * @author: malcolm
   * @since: 11/07/2022
   */

  downloadImage(){

    const box = document.getElementById('box');
    box?.parentElement?.classList.add('parent')

    box?.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img')?.src;

    // console.log('img', this.href);
  }

  /**
 * @method: Genera la imagen del qr
 * @author: malcolm
 * @since: 11/07/2022
 */

generateQRCode(){
  // if( this.directorioForm.valid){
  //   this.display = true;
  //   // alert("Please enter the name");
  // }
  return false;

}

hideQRCode(){
  // if( this.directorioForm.valid){
  //   this.display = false;
  //   // alert("Please enter the name");
  // }
  return false;

}
}
