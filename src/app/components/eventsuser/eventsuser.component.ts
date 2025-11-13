import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-eventsuser',
  imports:[
    CommonModule, FormsModule, NgIf, NgFor, LoadingComponent, 
    ImagenPipe, RouterModule
  ],
  templateUrl: './eventsuser.component.html',
  styleUrl: './eventsuser.component.scss'
})
export class EventsuserComponent {

   @Input() userprofile!: any;
    
      title = 'Eventos';
    
      loading = false;
      usersCount = 0;
      events!: Evento[]|null;
    
      p: number = 1;
      count: number = 8;
      isLoading = false;
      error!: string;
      selectedValue!: any;
      msm_error!: string;
      query: string = '';
      payments:any;
      public paymentscount:number=0;
      eventPaymentCounts: { [key: number]: number } = {};
    
      ServerUrl = environment.url_servicios;
      event_id!:number;
      paymentsbyevent!:number;
    
     constructor(
             private eventoService: EventoService,
             private paymentService: PaymentService,
             private http: HttpClient,
             handler: HttpBackend
           ) {
             this.http = new HttpClient(handler);
           }
         
           ngOnInit(): void {
             window.scrollTo(0, 0);
            //  this.userprofile 
            //  console.log(this.userprofile)
             
            //  this.geteventsbyClient();
           }
          
     
           ngOnChanges(changes: SimpleChanges): void {
             this.userprofile;
             console.log(this.userprofile);
             if (changes['userprofile'] && changes['userprofile'].currentValue) {
               this.geteventsbyClient();
               
             }
           }

           
         
           geteventsbyClient(){
             this.isLoading = true;
             this.eventoService.eventsbyClient(this.userprofile.id).subscribe((resp:any)=>{
               this.events = resp.client.eventos;
               this.payments = resp.client.payments;

               //filtramos los pagos del mismo cliente y del mismo evento
               const client_id = this.userprofile.id;
               this.payments = this.payments.filter((payment: any) => payment.event_id && payment.client_id && this.events && this.events.some((event: any) => event.id === payment.event_id));
               // extrae de cada pago donde el client_id y el event_id este repetido y cuenta cuantos son
               this.eventPaymentCounts = {};
               this.payments.forEach((payment: any) => {
                 if (payment.event_id) {
                   this.eventPaymentCounts[payment.event_id] = (this.eventPaymentCounts[payment.event_id] || 0) + 1;
                 }
               });
               this.paymentscount = Object.values(this.eventPaymentCounts).reduce((sum, count) => sum + count, 0);

               this.isLoading = false;
               console.log(resp);
             })
           }

           getPaymentbyClientbyEvent(){
            this.paymentService.getPaymentByEventbyClientId(this.event_id, this.userprofile.id).subscribe((resp:any)=>{

              this.paymentsbyevent = resp.payments;


            })
          }

     
           
         
           search() {
             return this.eventoService.search(this.query).subscribe((res: any) => {
               // console.log(res);
               this.events = res;
               if (!this.query) {
                 this.ngOnInit();
               }
             });
           }
         
           public PageSize(): void {
             this.geteventsbyClient();
             this.query = '';
           }
}
