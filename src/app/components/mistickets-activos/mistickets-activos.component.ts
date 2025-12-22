import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { TicketService } from '../../services/ticket.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import Swal from 'sweetalert2';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-mistickets-activos',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './mistickets-activos.component.html',
  styleUrl: './mistickets-activos.component.scss'
})
export class MisticketsActivosComponent {
  @Input() userprofile!: any;
  @Input() status: any;

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

  user: any = null;
  user_id: any = null;
  ticket!: any;

  ngOnInit(): void {
    let USER = localStorage.getItem("user");
    this.user = USER ? JSON.parse(USER) : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getTicketActivos();
    }
  }


  getTicketActivos() {
    return this.ticketService
      .getTicketSAc(this.userprofile.id)
      .subscribe((res: any) => {
        this.ticketsShared = res;
        console.log(this.ticketsShared);
      });
  }

  abrirModalInfo() {
    this.mostrarinfo = true;
  }

  closemodalInfo() {
    this.mostrarinfo = false;
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



}
