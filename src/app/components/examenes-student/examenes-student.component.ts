import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { Examen } from '../../models/examen';
import { Student } from '../../models/student';
import { ExamenService } from '../../services/examen.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-examenes-student',
  imports:[
    NgFor,LoadingComponent, NgIf, CommonModule
  ],
  templateUrl: './examenes-student.component.html',
  styleUrls: ['./examenes-student.component.css']
})
export class ExamenesStudentComponent {
  @Input()profileSeleccionado!:Student;

  isLoading = false;
    title = 'Examenes';
  
    loading = false;
    usersCount = 0;
    examenes!: Examen[]|null;
    studentprofile!: Student;
    p: number = 1;
    count: number = 8;
  
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
  
    selectedStudentProfile!: Student;
    selectedMateria!: Examen;
  
    constructor(
      private exameneService: ExamenService,
      private http: HttpClient,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
      // console.log(this.profileSeleccionado);
      // Removed this.getUsers() from here to avoid calling before profileSeleccionado is set
    }
    
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['profileSeleccionado'] && this.profileSeleccionado && this.profileSeleccionado.id) {
        // console.log(this.profileSeleccionado);
        this.getExamenes();
      }
    }
  
    getExamenes(): void {
      if (!this.profileSeleccionado || !this.profileSeleccionado.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.exameneService.getExamensbyStudent(this.profileSeleccionado.id).subscribe(
        (res: any) => {
          this.examenes = res.examenes;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
    search() {
      return this.exameneService.search(this.query).subscribe((res: any) => {
        this.examenes = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getExamenes();
      this.query = '';
    }
  
    openPaymentsModal(calif: Examen): void {
          this.selectedMateria = calif;
        }

    openNewModal(studentprofile: Student): void {
      this.selectedStudentProfile = studentprofile;
      console.log(studentprofile);
    }
}
