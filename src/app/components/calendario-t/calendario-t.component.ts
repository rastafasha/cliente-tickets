import { Component, Input, SimpleChanges } from '@angular/core';
import { CalendarioTareas } from '../../models/calendariotarea';
import { CalendariotareaService } from '../../services/calendariotarea.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { UserService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Materia } from '../../models/materia';

@Component({
  selector: 'app-calendario-t',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './calendario-t.component.html',
  styleUrls: ['./calendario-t.component.css'],
})
export class CalendarioTComponent {
  title = 'calendario-t';
  calendariotareas!: CalendarioTareas[] | null;

  isLoading: boolean = false;

  maestros!: Usuario[] | null;
  maestro!: Usuario;
  maestro_id!: Usuario;
  materia!: Materia;
  grado!:Usuario;
  selectedStudentProfile!: CalendarioTareas;
  selectedCalendario!: CalendarioTareas;

  constructor(
    private calendarioService: CalendariotareaService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.user;

    this.getMaestros();
  }

  getMaestros() {
    this.userService.getMaestros().subscribe((resp: any) => {
      this.maestros = resp.users;
      // console.log(this.maestros);
    });
  }

  getCalendariosBymaestro(maestro: any) {
    this.isLoading = true;
    this.calendarioService
      .getCalendarioTareabyMaestroActivos(maestro)
      .subscribe((resp: any) => {
        this.calendariotareas = resp.calendariotareas;
        this.isLoading = false;
        // console.log(resp);
      });
      
      this.getMaestro(maestro);
  }

  getMaestro(maestro:number){
    this.userService.showUser(maestro).subscribe((resp:any)=>{
      this.maestro = resp.user;
      this.materia = resp.user.materia
      // console.log(resp);
    })
  }

  openPaymentsModal(cal: CalendarioTareas): void {
    this.selectedCalendario = cal;
    // console.log(cal);
  }

  openNewModal(cal: CalendarioTareas): void {
    this.selectedStudentProfile = cal;
    // console.log(cal);
  }
}
