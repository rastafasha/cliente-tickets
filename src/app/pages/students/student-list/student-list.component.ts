import { Component, Input, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Parent } from '../../../models/parents';
import { Student } from '../../../models/student';
import { ParentService } from '../../../services/parent-service.service';
import { StudentService } from '../../../services/student-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ListapaymentshijoComponent } from '../../../components/listapaymentshijo/listapaymentshijo.component';
import {  RouterLink } from '@angular/router';
import { ImagenPipe } from "../../../pipes/imagen.pipe";
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { PieChart2Component } from '../../../components/charts/pie-chart2/pie-chart2.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-list',
  imports: [HeaderComponent,MenuFooterComponent,
    CommonModule, NgFor,NgIf,LoadingComponent, ReactiveFormsModule, FormsModule,
    ListapaymentshijoComponent, RouterLink, ImagenPipe, BackButtnComponent,
    PieChart2Component
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {
    userprofile!: Parent;
    isLoading = false;
    pageTitle = 'Estudiantes';
  
    loading = false;
    usersCount = 0;
    students!: Student[];
    studentprofile!: Student;
    roles:any;
  
    p: number = 1;
    count: number = 8;
  
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
    // role:any;
  
    selectedStudentProfile!: Student;
  
    constructor(
      private parentService: ParentService,
      private studentService: StudentService,
      private http: HttpClient,
      private authService: AuthService,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
      this.userprofile = this.authService.getUser();
      // console.log(this.userprofile);
      // Removed this.getUsers() from here to avoid calling before userprofile is set
      this.getStudents();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      }
    }
  
    getStudents(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.studentService.getByParentId(this.userprofile.id).subscribe(
        (res: any) => {
          this.students = res.students;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
    search() {
      return this.studentService.search(this.query).subscribe((res: any) => {
        this.students = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getStudents();
      this.query = '';
    }
  
    openPaymentsModal(student: Student): void {
      this.selectedStudentProfile = student;
    }

    eliminarUser(user:Student){
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
             this.studentService.deleteById(user.id).subscribe(
              response =>{
                Swal.fire({
                  title: "Borrado!",
                  text: "Registro Eliminado.",
                  icon: "success"
                });
                
                this.getStudents();
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
