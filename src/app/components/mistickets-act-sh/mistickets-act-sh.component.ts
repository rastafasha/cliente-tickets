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
  selector: 'app-mistickets-act-sh',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './mistickets-act-sh.component.html',
  styleUrl: './mistickets-act-sh.component.scss'
})
export class MisticketsActShComponent {
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
  isTtickets = false;

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
      this.getTicketActivosSh();
    }
  }


  getTicketActivosSh() {
    this.isLoading = true;
    return this.ticketService
      .getTicketACtShared(this.userprofile.id)
      .subscribe((res: any) => {
        this.ticketsShared = res;
        this.isLoading = false;
        if (this.ticketsShared.length > 0) {
          this.isTtickets = true;
        } else {
          this.isTtickets = false;
        }
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


}
