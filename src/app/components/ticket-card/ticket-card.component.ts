import { Component, Input } from '@angular/core';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-card',
  imports: [ImagenPipe,CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {
  @Input() payment!:any;

  mostrarinfo: boolean = false;
  option_selectedd:number = 1;
  solicitud_selectedd:any = null;
   query: string = '';
  
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
      // return this.eventoService.search(this.query).subscribe((res: any) => {
      //   this.eventos = res;
      //   if (!this.query) {
      //     this.ngOnInit();
      //   }
      // });
    }
  
    public PageSize(): void {
      // this.getEventos();
      // this.query = '';
    }
  
}
