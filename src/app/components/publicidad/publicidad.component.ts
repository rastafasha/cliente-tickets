import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { Evento } from '../../models/evento';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-publicidad',
  imports: [
    CommonModule, NgFor, 
    ReactiveFormsModule, FormsModule,
    RouterLink, ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss']
})
export class PublicidadComponent implements OnInit {

  public cargando: boolean = false;
  public isLoading: boolean = false;
  currentSlide = 0;
  eventos:Evento[] = [];
  
  
  constructor(
    public eventoService:EventoService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.eventoService.getActivos().subscribe((resp:any)=>{
      // console.log(resp);
      this.eventos = resp.data;
      this.isLoading = false;
    })
  }

   selectSlide(index: number) {
    this.currentSlide = index;
  }

   prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.eventos.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.eventos.length - 1) ? 0 : this.currentSlide + 1;
  }
  

}
