import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, signal, SimpleChanges, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { TicketService } from '../../../services/ticket.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import Swal from 'sweetalert2';
import { EventoService } from '../../../services/evento.service';
import { Client } from '../../../models/client.model';
import { environment } from '../../../../environments/environment';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';

const frontend = environment.url_frontend;
declare var bootstrap: any;
@Component({
  selector: 'app-mistickets-activos',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    TicketDetailComponent
  ],
  templateUrl: './mistickets-activos.component.html',
  styleUrl: './mistickets-activos.component.scss'
})
export class MisticketsActivosComponent {
  @ViewChild('offcanvasTicket', { static: false }) offcanvasElement!: ElementRef;
  @Input() userprofile!: any;
  @Input() status: any;
  @Input() event: any;

  title: string = 'Tickets Recibidos';

  isLoading: boolean = false;
  mostrarinfo: boolean = false;
  option_selectedd: number = 1;
  solicitud_selectedd: any = null;
  query: string = '';
  clients: any[] = [];

  showList: boolean = false;
  isloading: boolean = false;

  public whatsapp!: string;
  client!: Client;
  contactoSelected: any = null;
  ticketSeleccionado = signal<any>(null);
    isOpen = signal<boolean>(false);
  
  private clientService = inject(ClientService);
  private ticketService = inject(TicketService);
  private eventoService = inject(EventoService);

  tickets: any[] = [];
  isTtickets = false;

  user: any = null;
  user_id: any = null;
  ticket!: any;

  ngOnInit(): void {
    let USER = localStorage.getItem("user");
    this.user = USER ? JSON.parse(USER) : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.status)
    // if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
    //   this.getTicketActivos();
    // }
    if (changes['status'] && changes['status'].currentValue) {
    switch (changes['status'].currentValue) {
      case 'activos':
        this.getTicketActivos();
        break;
      case 'usados':
        this.getTicketporClienteUsados();
        break;
      case 'shared':
        this.getTicketShared();
        break;
      case 'enviados':
        this.getTicketporClienteEnviados();
        break;
      case 'recibidos':
        this.getTicketRecibidos();
        break;
    }
  }
  }


  getTicketActivos() {
    this.isloading = true;
    return this.ticketService
      .getTicketSAc(this.userprofile.id)
      .subscribe((res: any) => {
        this.tickets = res;
        console.log('activos', res)
        this.isloading = false;

        if (this.tickets.length > 0) {
          this.isTtickets = true;
        } else {
          this.isTtickets = false;
        }
      });
  }

  getTicketporClienteUsados() {
    this.isLoading = true;
    return this.ticketService.tiketUsedorExpired(this.userprofile.id).subscribe((res: any) => {
      this.tickets = res;
      console.log('usados', res)
       this.isLoading = false;
        if (this.tickets.length > 0) {
          this.isTtickets = true;
        } else {
          this.isTtickets = false;
        }

    }
    );
  }

  getTicketShared() {
    this.isLoading = true;
    return this.ticketService
      .getTicketACtShared(this.userprofile.id)
      .subscribe((res: any) => {
        this.tickets = res;
        console.log('shared', res)
        this.isLoading = false;
        if (this.tickets.length > 0) {
          this.isTtickets = true;
        } else {
          this.isTtickets = false;
        }
      });
  }

  getTicketporClienteEnviados() {
    this.isLoading = true;
    return this.ticketService.getTicketShared(this.userprofile.id).subscribe((res: any) => {
      this.tickets = res;
      console.log('enviados', res)
      this.isLoading = false;
      if (this.tickets.length > 0) {
        this.isTtickets = true;
      } else {
        this.isTtickets = false;
      }

    }
    );
  }

  getTicketRecibidos() {
    this.isLoading = true;
    return this.ticketService
      .getTicketShared(this.userprofile.id)
      .subscribe((res: any) => {
        this.tickets = res;
        console.log('recibidos', res)
         this.isLoading = false;
        if (this.tickets.length > 0) {
          this.isTtickets = true;
        } else {
          this.isTtickets = false;
        }
      });
  }


  optionSelected(value: number) {
    this.option_selectedd = value;
    if (this.option_selectedd === 1) {
      // this.ngOnInit();
    }
    if (this.option_selectedd === 2) {
      this.solicitud_selectedd = null;
    }
  }

  search() {
    return this.clientService.search(this.query).subscribe((res: any) => {
      this.clients = res;
      this.showList = true;
      if (!this.query) {
        this.ngOnInit();
        this.showList = false;
      }
    });
  }

  public PageSize(): void {
    this.query = '';
    this.showList = false;
  }


  compartir(client: any) {

    Swal.fire({
      title: "Quieres compartir este ticket?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, Quiero compartirlo",
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isloading = true;
        const data = {
          from_id: this.user_id,
          client_id: client.id,
          status: 'SHARED'
        };
        this.ticketService.compartirTicket(this.ticket.id, data).subscribe((res: any) => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Se Compartió Correctamente!'
            });
            // this.router.navigateByUrl('/');
            this.isloading = false;
            this.PageSize()
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Ningun cambio efectuado", "", "info");
        // this.ngOnInit();
      }
    });


  }

  aceptarTicketShared(ticket: any) {

    Swal.fire({
      title: "Quieres usar este ticket?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, Quiero usarlo",
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isloading = true;
        const data = {
          client_id: this.userprofile.id,
          ticket_id: ticket.id,
          event_id: ticket.event.id,
        };
        this.eventoService.addClienteToEvento(data, ticket.event.id).subscribe(
          (res: any) => {
            this.isloading = false;
            Swal.fire(
              '¡Éxito!',
              'Has aceptado el ticket compartido correctamente.',
              'success'
            );
            this.getTicketActivos();
          },
          (error: any) => {
            this.isloading = false;
            Swal.fire(
              'Error',
              'Hubo un problema al aceptar el ticket compartido.',
              'error'
            );
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Ningun cambio efectuado", "", "info");
        // this.ngOnInit();
      }
    });




  }



  // Generate WhatsApp message with order items
  getWhatsAppMessage(): string {

    if (!this.userprofile || this.ticket) {
      return '';
    }

    let message = `*Hola! quiero Invitarte al evento #${this.ticket.event.name}*\n\n`;
    message += `*el dia:* ${this.ticket.event.fecha_inicio}\n`;
    message += `─────────────────────\n`;
    message += `*Accede a la App:* ${frontend}\n y comparte momentos increíbles con nosotros!`;

    return encodeURIComponent(message);


  }

  // Open WhatsApp with pre-filled message
  sendWhatsAppOrder(whatsapp:string): void {

    this.whatsapp = whatsapp;
    const phone = this.whatsapp.toString().replace(/\D/g, '');
    const message = this.getWhatsAppMessage();

    if (message) {
      const url = `https://wa.me/${phone}?text=${message}`;
      window.open(url, '_blank');
    }
    this.getTicketActivos();

  }

verDetalleTicket(ticket: any) {
  this.ticketSeleccionado.set(ticket);
  // console.log(pago);

  // Le da tiempo a Angular de renderizar el *ngIf en el DOM
  setTimeout(() => {
    const el = document.getElementById('offcanvasTicket');
    if (el) {
      const bsOffcanvas = new bootstrap.Offcanvas(el);
      bsOffcanvas.show();
    } else {
      console.error('El elemento offcanvasTicket no fue encontrado en el DOM.');
    }
  }, 0);
}

cerrarOffcanvas() {
  this.isOpen.set(false);
}


}
