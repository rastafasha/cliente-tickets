import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { TicketService } from '../../services/ticket.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

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

  tickets: any[] = [];
  ticketsShared: any[] = [];

  ngOnInit(): void {
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
}
