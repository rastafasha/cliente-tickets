import { Component, Input, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {  RouterLink } from '@angular/router';
import { ImagenPipe } from "../../../pipes/imagen.pipe";
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import Swal from 'sweetalert2';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/evento';
import { CategoryBarComponent } from '../../../components/category-bar/category-bar.component';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-evento-list',
  imports: [HeaderComponent,MenuFooterComponent,
    CommonModule, NgFor,NgIf,LoadingComponent, ReactiveFormsModule, FormsModule,
    
    RouterLink, ImagenPipe, BackButtnComponent,CategoryBarComponent
    // PieChart2Component
  ],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.scss'
})
export class EventoListComponent {
    userprofile!:any ;
    isLoading = false;
    pageTitle = 'Eventos';
  
    loading = false;
    usersCount = 0;
    eventos!: Evento[];
    eventprofile!: Evento;
    roles:any;
  
    p: number = 1;
    count: number = 8;
  
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
    // role:any;
  
    selectedEventoProfile!: Evento;
  
    constructor(
      private eventoService: EventoService,
      private http: HttpClient,
      private authService: AuthService,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
      let USER = localStorage.getItem("user");
    this.userprofile = USER ? JSON.parse(USER) : null;
      // console.log(this.userprofile);
      // Removed this.getUsers() from here to avoid calling before userprofile is set
      this.getEventos();
      // this.getEventosbyUser();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      }
    }

    getEventos(){
      this.eventoService.getActivos().subscribe((resp:any)=>{
        this.eventos = resp.data;
      })
    }
  
    getEventosbyUser(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.eventoService.eventsbyUser(this.userprofile.id).subscribe(
        (res: any) => {
          this.eventos = res.eventos;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
    search() {
      return this.eventoService.search(this.query).subscribe((res: any) => {
        this.eventos = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getEventos();
      this.query = '';
    }
  
    openPaymentsModal(evento: Evento): void {
      this.selectedEventoProfile = evento;
    }

    eliminarUser(evento:Evento){
      Swal.fire({
          title: "Esta Seguro?",
          text: "Se perderán todos los datos!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrar!"
        }).then((result) => {
          if (result.isConfirmed) {
             this.eventoService.deleteById(evento).subscribe(
              response =>{
                Swal.fire({
                  title: "Borrado!",
                  text: "Registro Eliminado.",
                  icon: "success"
                });
                
                this.getEventos();
              },
              error=>{
                this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
              }
            );
            
          }
        });
   
      // this.getStudents();
  }
}
