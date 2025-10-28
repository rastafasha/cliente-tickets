import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { LineChartComponent } from '../../../components/charts/line-chart/line-chart.component';
import { CalificacionService } from '../../../services/calificacion.service';
import { Student } from '../../../models/student';
import { Calificacion } from '../../../models/calificacion';
import { ExamenesStudentComponent } from '../../../components/examenes-student/examenes-student.component';
import { CalendarioTComponent } from '../../../components/calendario-t/calendario-t.component';

@Component({
  selector: 'app-student-detail',
  imports: [
      CommonModule,
          ReactiveFormsModule,
          FormsModule,
          LoadingComponent,
          TranslateModule,
          ExamenesStudentComponent,
          NgFor,
          LineChartComponent,
          CalendarioTComponent
          // ImagenPipe
          
    ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  @Input() profileSeleccionado!: Student;
  isLoading = false;
  option_selectedd:number = 1;
  solicitud_selectedd:any = null;

  calificaciones!:Calificacion[]|null;
  error!: string;

  constructor(private calificacionService: CalificacionService,){}

  ngOnInit(){
    this.getStudents();
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
      this.calificacionService.getCalificacionsbyStudent(this.profileSeleccionado.id).subscribe(
        (res: any) => {
          // this.students = res.students;
          this.calificaciones = res.calificaciones;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }

}
