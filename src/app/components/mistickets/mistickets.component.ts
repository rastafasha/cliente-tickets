import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../../services/client.service';
import { TicketService } from '../../services/ticket.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-mistickets',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './mistickets.component.html',
  styleUrl: './mistickets.component.scss',
})
export class MisticketsComponent {
  @Input() userprofile!: any;

  title: string = 'Tickets Recibidos';

  isLoading: boolean = false;
  mostrarinfo: boolean = false;
  option_selectedd: number = 1;
  solicitud_selectedd: any = null;
  query: string = '';
  clients: any[] = [];

  showList: boolean = false;
  isloading: boolean = false;

  private clientService = inject(ClientService);
  private ticketService = inject(TicketService);
  private eventoService = inject(EventoService);

  tickets: any[] = [];
  ticketsShared: any[] = [];

  ngOnInit(): void {
    // window.scrollTo(0, 0); // this.getEventos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getTicketShared();
    }
  }

  getTicketShared() {
    return this.ticketService
      .getTicketShared(this.userprofile.id)
      .subscribe((res: any) => {
        this.ticketsShared = res;
      });
  }

  abrirModalInfo() {
    this.mostrarinfo = true;
  }

  closemodalInfo() {
    this.mostrarinfo = false;
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
          event_id: ticket.event_id,
        };
        this.eventoService.addClienteToEvento(data, ticket.event_id).subscribe(
          (res: any) => {
            this.isloading = false;
            Swal.fire(
              '¡Éxito!',
              'Has aceptado el ticket compartido correctamente.',
              'success'
            );
            this.getTicketShared();
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
}
