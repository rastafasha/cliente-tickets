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
import { Payment } from '../../models/payment';

@Component({
  selector: 'app-eventsuser',
  imports: [
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
  events!: any[];

  p: number = 1;
  count: number = 8;
  isLoading = false;
  error!: string;
  selectedValue!: any;
  msm_error!: string;
  query: string = '';
  public paymentscount: number = 0;
  eventPaymentCounts: { [key: number]: number } = {};

  ServerUrl = environment.url_servicios;
  event_id!: number;
  paymentsbyevent!: number;
  asistencia: any;

  payments!: Payment[];

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
    // console.log(this.userprofile);
    if (changes['userprofile'] && changes['userprofile'].currentValue) {
      this.getEventsporCliente();

    }
  }



  getEventsporCliente() {
    this.isLoading = true;
    this.eventoService.eventsbyClient(this.userprofile.id).subscribe(
      (res: any) => {
        this.events = res.client.eventos;
        this.payments = res.client.payments;
        this.asistencia = res.asistencia;

        if(this.asistencia === 1){
          this.asistencia = 'Asistió al evento';
        }else{
          this.asistencia = 'Asistecia no confirmada';
        }

        // Compute ticketcount for events with repeated event_id
        const countMap: { [key: number]: number } = {};
        this.payments.forEach(payment => {
          if (payment.event_id) {
            countMap[payment.event_id] = (countMap[payment.event_id] || 0) + 1;
          }
        });
        this.events.forEach(event => {
          if (countMap[event.id] > 1) {
            event.ticketcount = countMap[event.id];
          }
        });

        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
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
    this.getEventsporCliente();
    this.query = '';
  }
}
