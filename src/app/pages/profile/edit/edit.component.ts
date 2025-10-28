import { CommonModule, NgFor } from '@angular/common';
import { Component, Type } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Precios, Profile, RedesSociales } from '../../../models/profile.model';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ParentService } from '../../../services/parent-service.service';
import { Parent } from '../../../models/parents';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    HeaderComponent,
        MenuFooterComponent, 
        BackButtnComponent,
        ReactiveFormsModule,
        FormsModule,
        LoadingComponent,
        TranslateModule,
        ImagenPipe
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  pageTitle= 'Edit Profile';
  Title!:string;
  public iswhatsapp : boolean = false;
  selectedValueCode = '';
  

  public isLoading:boolean = false;
    loadingTitle!:string;

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl(''),
    state: new FormControl('Caracas'),
    zipCode: new FormControl(''),
    isAgree: new FormControl(false),

    });

  public user!: any;
  public role!: any;
  public user_id!: number;
  public roles!: [];
  public profile_id!: number;
  public gender!: number;

    // public profile!: Profile;
    public profile: Parent = new Parent();
    public perfilForm!: FormGroup;
    public profileSeleccionado!: Parent;


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
      private parentService: ParentService,
      private clienteService: ClientService,
      private fb: FormBuilder,
      private translate: TranslateService,
    ) {
      this.user = this.authService.getUser();
    }
  
    

    ngOnInit(): void {
      window.scrollTo(0,0);
      let USER = localStorage.getItem("user");
     if (USER) {
      try {
        this.user = JSON.parse(USER);
        this.role = this.user.roles && this.user.roles.length > 0 ? this.user.roles[0] : '';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.user = null;
        this.role = '';
      }
    } else {
      this.user = null;
      this.role = '';
    }
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
      this.validarFormularioPerfil();
      this.Title = this.user.name;
      
    }


    getProfile(){
      this.isLoading = true;
      this.loadingTitle = 'Cargando perfil';
      this.clienteService.getClient(this.user.id).subscribe(
        (resp:any) => {
          // console.log('Profile response:', resp); // Log the response
          this.profile = resp.cliente;
         
          this.profile_id = resp.cliente.id;
          this.IMAGE_PREVISUALIZA = resp.cliente.avatar;
          this.FILE_AVATAR = resp.cliente.avatar;
          this.gender = resp.cliente.gender
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching profile:', error); // Log any errors
        }
      );
    }



  iniciarFormularioPerfil(id:number){
    if (!id == null || !id == undefined || id) {
      this.clienteService.getClient(this.user.id).subscribe(
        (res:any) => {
          this.profileSeleccionado = res;
          console.log('profileSeleccionado',this.profileSeleccionado);
          this.userForm.patchValue({
            id: res.id,
            name: res.name,
            surname: res.surname,
            birt_date: res.birt_date,
            address: res.address,
            lang: res.lang,
            gender: res.gender,
            n_doc: res.n_doc,
            mobile: res.mobile,
            usuario: this.user.id,
          });
          
          // console.log('profileSeleccionado',this.profileSeleccionado);
          // this.getProfile();
        }

      );
    } else {
      this.pageTitle = 'Crear Perfil';
    }



  }

  validarFormularioPerfil(){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mobile: ['', Validators.required],
      telhome: [''],
      address: [''],
      n_doc: [''],
      lang: [''],
      gender: [''],
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


  onUserSave(){

    const formData = new FormData();
    formData.append("name", this.userForm.value.name);
    formData.append("surname", this.userForm.value.surname);
    // formData.append("usuario", this.user.id+'');
    formData.append("client_id", this.user.id+'');
    if (this.userForm.value.address) {
      formData.append("address", this.userForm.value.address);
      
    }
    
    if (this.userForm.value.mobile) {
      formData.append("mobile", this.userForm.value.mobile);
      
    }
    if (this.userForm.value.n_doc) {
      formData.append("n_doc", this.userForm.value.n_doc);
      
    }
    if (this.userForm.value.gender) {
      formData.append("gender", this.userForm.value.gender+'');
      
    }
    if (this.FILE_AVATAR) {
      formData.append("imagen", this.FILE_AVATAR);
    }
    if (this.lang) {
      formData.append("lang", this.FILE_AVATAR);
    }

    this.clienteService.update( formData, this.user.id).subscribe((resp:any) => {
        console.log(resp);
        this.profileSeleccionado = resp;
        // this.router.navigate(['/profile']);
        Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
        this.ngOnInit();
      });

  }

  public cambiarLenguaje(lang:any) {
    this.activeLang = lang;
    this.translate.use(lang);
    this.flag = !this.flag;
    localStorage.setItem('lang', this.activeLang);
    this.userForm.patchValue({ lang: lang });
  }

}
