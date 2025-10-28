import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { ParentService } from '../../../services/parent-service.service';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { StudentService } from '../../../services/student-service.service';
import { Student } from '../../../models/student';
import { ImagenPipe } from "../../../pipes/imagen.pipe";
import { StudentDetailComponent } from "../student-detail/student-detail.component";
@Component({
  selector: 'app-student-edit',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent,
    BackButtnComponent,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    TranslateModule,
    StudentDetailComponent
],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {
  pageTitle= 'Estudiante';
    Title!:string;
    public iswhatsapp : boolean = false;
    selectedValueCode = '';
    
    option_selected:number = 1;
  solicitud_selected:any = null;

    public isLoading:boolean = false;
      loadingTitle!:string;
  
    userForm: FormGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      userName: new FormControl('', [Validators.email, Validators.required]),
      matricula: new FormControl(''),
      school_year: new FormControl(''),
      section: new FormControl(''),
      state: new FormControl('Caracas'),
      birth_date: new FormControl(''),
      isAgree: new FormControl(false),
  
      });
  
    public user!: Usuario;
    public user_id!: number;
    public student!: Student;
    public roles!: [];
    public student_id!: number;
    public gender!: number;
  
      // public profile!: Profile;
      public profile: Student = new Student();
      public perfilForm!: FormGroup;
      public profileSeleccionado!: Student;
  
  
      public FILE_AVATAR: any;
      public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
      text_validation: any = null;
      iconoSeleccionado:any;
  
      // public paises :Pais[] = [];
  
      langs: string[] = [];
    public activeLang = 'es';
    flag = false;
    lang!:string;
      
  
      constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private parentService: ParentService,
        private studentService: StudentService,
        private fb: FormBuilder,
        private translate: TranslateService,
      ) {
        this.user = this.authService.getUser();
      }
    
      
  
      ngOnInit(): void {
        window.scrollTo(0,0);
        this.user_id = this.user.id;
        this.validarFormularioPerfil();
        this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
        
        
      }

      optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        this.ngOnInit();
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
      }
    }
  
  
      getProfile(id:number){
        this.isLoading = true;
        this.loadingTitle = 'Cargando perfil';
        this.studentService.getUserById(id).subscribe(
          (resp:any) => {
            // console.log('Profile response:', resp); // Log the response
            this.profile = resp.student;
           
            this.student_id = resp.student.id;
            this.IMAGE_PREVISUALIZA = resp.student.avatar;
            this.FILE_AVATAR = resp.student.avatar;
            this.gender = resp.student.gender
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching profile:', error); // Log any errors
          }
        );
      }
  
  
  
    iniciarFormularioPerfil(id:number){
      if (!id == null || !id == undefined || id) {
        this.studentService.getUserById(id).subscribe(
          (res:any) => {
            this.userForm.patchValue({
              id: res.id,
              name: res.student.name,
              surname: res.student.surname,
              birth_date: res.student.birth_date,
              address: res.student.address,
              matricula: res.student.matricula,
              school_year: res.student.school_year,
              section: res.student.section,
              gender: res.student.gender,
              n_doc: res.student.n_doc,
              usuario: this.user.id,
            });
            this.profileSeleccionado = res.student;
            this.student_id = res.student.id;
            // console.log('profileSeleccionado',res);
            // this.getProfile();
          }
  
        );
      } else {
        this.pageTitle = 'Crear Studiante';
      }
  
  
  
    }
  
    validarFormularioPerfil(){
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        matricula: [''],
        school_year: [''],
        section: [''],
        n_doc: [''],
        gender: [''],
        birth_date: [''],
        usuario: [this.user.id],
        id: [''],
      });
    }
  
  
    loadFile($event: any) {
      if ($event.target.files[0].type.indexOf("image")) {
            this.text_validation = "Solamente pueden ser archivos de tipo imagen";
            return;
          }
          this.text_validation = "";
          this.FILE_AVATAR = $event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(this.FILE_AVATAR);
          reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
    }
  
   onPaServiceSelect(event: any) {
      const ic = event;
      this.iswhatsapp = false;
      if (ic === 'fa fa-whatsapp') {
        this.selectedValueCode = ic;
        this.iswhatsapp = true;
      }
    }
  
  
    onUserSave(){debugger
  
      const formData = new FormData();
      formData.append("name", this.userForm.value.name);
      formData.append("surname", this.userForm.value.surname);
      // formData.append("usuario", this.user.id+'');
      formData.append("parent_id", this.user.id+'');
      if (this.userForm.value.address) {
        formData.append("address", this.userForm.value.address);
        
      }
      // if (this.userForm.value.student_id) {
      //   formData.append("student_id", this.userForm.value.student_id);
        
      // }
      
      if (this.userForm.value.matricula) {
        formData.append("matricula", this.userForm.value.matricula);
        
      }
      if (this.userForm.value.school_year) {
        formData.append("school_year", this.userForm.value.school_year);
        
      }
      if (this.userForm.value.section) {
        formData.append("section", this.userForm.value.section);
        
      }
      if (this.userForm.value.birth_date) {
        formData.append("birth_date", this.userForm.value.birth_date);
        
      }
      if (this.userForm.value.n_doc) {
        formData.append("n_doc", this.userForm.value.n_doc);
        
      }
      if (this.userForm.value.gender) {
        formData.append("gender", this.userForm.value.gender);
        
      }
      if (this.FILE_AVATAR) {
        formData.append("imagen", this.FILE_AVATAR);
      }
      if (this.lang) {
        formData.append("lang", this.FILE_AVATAR);
      }
  
      

        if(this.student_id){
          this.studentService.update( formData, this.student_id).subscribe((resp:any) => {
              console.log(resp);
              this.profileSeleccionado = resp;
              // this.router.navigate(['/profile']);
              Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
              this.ngOnInit();
            });
        }else{
          this.studentService.createStudent( formData).subscribe((resp:any) => {
              console.log(resp);
              Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
              this.router.navigate(['/students']);
              this.ngOnInit();
            });
        }
  
    }
  
    public cambiarLenguaje(lang:any) {
      this.activeLang = lang;
      this.translate.use(lang);
      this.flag = !this.flag;
      localStorage.setItem('lang', this.activeLang);
      this.userForm.patchValue({ lang: lang });
    }
}
