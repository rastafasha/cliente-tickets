import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/evento';
import { ImagenPipe } from '../../../pipes/imagen.pipe';

@Component({
  selector: 'app-evento-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    TranslateModule,
    // NgFor,
    MenuFooterComponent,
    HeaderComponent,
    BackButtnComponent,
    ImagenPipe,
    RouterModule
],
  templateUrl: './evento-detail.component.html',
  styleUrl: './evento-detail.component.scss'
})
export class EventoDetailComponent {
  pageTitle= 'Evento';
  @Input() profileSeleccionado!: Evento;
  isLoading = false;
  option_selectedd:number = 1;
  solicitud_selectedd:any = null;
  evento!:Evento;
  error!: string;

  constructor(
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    window.scrollTo(0,0);
    this.getStudents();
    this.activatedRoute.params.subscribe( ({id}) => this.getEvento(id));

  }

  getEvento(id:number){
    this.isLoading= true;
    this.eventoService.getById(id).subscribe(
      res=>{
        this.evento = res.event;
        this.isLoading = false;
      }

    )
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

    getStudents(): void {
      if (!this.profileSeleccionado || !this.profileSeleccionado.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      
    }

}
