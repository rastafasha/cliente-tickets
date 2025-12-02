import { Component, inject, Input, OnInit } from '@angular/core';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-ticket-card',
  imports: [ImagenPipe, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent implements OnInit {
  @Input() payment!:any;

  isLoading: boolean = false;
  mostrarinfo: boolean = false;
  option_selectedd:number = 1;
  solicitud_selectedd:any = null;
   query: string = '';
clients:any[] = [];

showList: boolean = false;

  private clientService = inject(ClientService);

   ngOnInit(): void {
    window.scrollTo(0, 0); // this.getEventos();
  }
  
  compartir(){
    alert('Funcionalidad de compartir en desarrollo');
  }

  abrirModalInfo(){
    this.mostrarinfo = true;
  }

  closemodalInfo(){
    this.mostrarinfo = false;
  }


   optionSelected(value:number){
      this.option_selectedd = value;
      if(this.option_selectedd === 1){

        // this.ngOnInit();
      }
      if(this.option_selectedd === 2){
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
