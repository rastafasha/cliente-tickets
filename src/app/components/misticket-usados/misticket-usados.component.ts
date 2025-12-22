import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-misticket-usados',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './misticket-usados.component.html',
  styleUrl: './misticket-usados.component.scss'
})
export class MisticketUsadosComponent {
  @Input() userprofile!: any;

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
    // window.scrollTo(0, 0); // this.getEventos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getTicketporCliente();
    }
  }


  getTicketporCliente() {
    return this.ticketService.tiketUsedorExpired(this.userprofile.id).subscribe((res: any) => {
      this.tickets = res;

    }
    );
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
