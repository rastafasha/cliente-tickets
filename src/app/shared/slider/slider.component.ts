import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-slider',
  imports: [
    CommonModule,
    RouterModule, 
    NgFor,
    ImagenPipe
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  sliders!: Evento[];
    imagenSerUrl = environment.url_media;

    currentSlide = 0;
  
  
    constructor(
      public eventoService: EventoService,
      public http: HttpClient
    ) { }
  
    ngOnInit(): void {
      this.obtenerSliders();
  
    }
  
    obtenerSliders(){
      return this.eventoService.getActivos().subscribe(
        resp=>{
          this.sliders = resp.eventos;
          // console.log(this.sliders);
        }
      )
    }

    selectSlide(index: number) {
    this.currentSlide = index;
  }

   prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.sliders.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.sliders.length - 1) ? 0 : this.currentSlide + 1;
  }

}
