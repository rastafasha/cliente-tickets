import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-slider',
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    ImagenPipe,
    LoadingComponent
],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  sliders!: Evento[];
    imagenSerUrl = environment.url_media;

    currentSlide = 0;
    isLoading = false;
  
  
    constructor(
      public eventoService: EventoService,
      public http: HttpClient
    ) { }
  
    ngOnInit(): void {
      this.obtenerSliders();
  
    }
  
    obtenerSliders(){
      this.isLoading = true;
      return this.eventoService.getDestacados().subscribe(
        resp=>{
          this.sliders = resp.eventos;
          // console.log(this.sliders);
          this.isLoading = false;
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
