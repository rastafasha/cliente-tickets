import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-eventsuser',
  imports:[
    CommonModule, FormsModule, NgIf, NgFor, LoadingComponent, 
    ImagenPipe
  ],
  templateUrl: './eventsuser.component.html',
  styleUrl: './eventsuser.component.scss'
})
export class EventsuserComponent {

   @Input() userprofile!: any;
    
      title = 'Eventos';
    
      loading = false;
      usersCount = 0;
      events!: Evento[]|null;
    
      p: number = 1;
      count: number = 8;
      isLoading = false;
      error!: string;
      selectedValue!: any;
      msm_error!: string;
      query: string = '';
    
      ServerUrl = environment.url_servicios;
    
     constructor(
             private eventoService: EventoService,
             private http: HttpClient,
             handler: HttpBackend
           ) {
             this.http = new HttpClient(handler);
           }
         
           ngOnInit(): void {
             window.scrollTo(0, 0);
            //  this.userprofile 
            //  console.log(this.userprofile)
             
            //  this.geteventsbyClient();
           }
          
     
           ngOnChanges(changes: SimpleChanges): void {
             this.userprofile;
             console.log(this.userprofile);
             if (changes['userprofile'] && changes['userprofile'].currentValue) {
               this.geteventsbyClient();
               
             }
           }
         
           geteventsbyClient(){
             this.isLoading = true;
             this.eventoService.eventsbyClient(this.userprofile.id).subscribe((resp:any)=>{
               this.events = resp.client.eventos;
               this.isLoading = false;
               console.log(this.events);
             })
           }
     
           
         
           search() {
             return this.eventoService.search(this.query).subscribe((res: any) => {
               // console.log(res);
               this.events = res;
               if (!this.query) {
                 this.ngOnInit();
               }
             });
           }
         
           public PageSize(): void {
             this.geteventsbyClient();
             this.query = '';
           }
}
