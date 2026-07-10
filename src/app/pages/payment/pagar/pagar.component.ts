import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Payment } from '../../../models/payment';
import { PaymentMethod } from '../../../models/paymentmethod.model';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { UserService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { PaymentmethodService } from '../../../services/paymentmethod.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { TasabcvService } from '../../../services/tasabcv.service';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/evento';
import { ImagenPipe } from '../../../pipes/imagen.pipe';

@Component({
  selector: 'app-pagar',
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    // HeaderComponent,
    // MenuFooterComponent,
    BackButtnComponent,
    LoadingComponent,
    // ImagenPipe
  ],
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css'],
})
export class PagarComponent implements OnInit {
  public PaymentRegisterForm!: FormGroup;
  public isLoading: boolean = true;
  public cargandoPago: boolean = true;
  pageTitle = 'Comprar';
  public text_validation: string = '';
  public text_success: string = '';

  metodo!: string;
  usuario: Usuario;
  error!: string;
  deuda: any;
  pagoSeleccionado!: Payment;
  paymentMethods!: PaymentMethod[] | null;

  event_id!: number;
  parent_id!: number;
  fecha!: Date;
  evento!: Evento;

  precio_dia!: number;
  precio_general!: number;
  precio_estudiantes!: number;
  precio_especialistas!: number;
  
  precio_fecha!: Date;

  preciosEvento: any;
  bankselected: any = null;
  preciopagar: number = 0;

  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    public authService: AuthService,
    public userService: UserService,
    public paymentMethodService: PaymentmethodService,
    public eventoService: EventoService,
    public tasaBcvService: TasabcvService
  ) {
    this.usuario = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.activatedRoute.params.subscribe((resp: any) => {
      // console.log(resp);
      this.event_id = resp.id;
      this.getEvento();
    });

    this.usuario = this.authService.user;
    // console.log(this.usuario);
    // this.getInfoPago();
    this.validarFormulario();
    this.getUltimoPrecioTasaBcv();
    this.getTiposdepagos();
  }
  getTiposdepagos(): void {
    this.isLoading = true;
    // return this.planesService.carga_info();
    this.paymentMethodService
      .getPaymentmethodsActivos()
      .subscribe((resp: any) => {
        this.paymentMethods = resp.tiposdepagos;
        // console.log(resp);
        this.isLoading = false;
        (error: any) => (this.error = error);
      });
  }

  getUltimoPrecioTasaBcv() {
    this.isLoading = true;
    this.tasaBcvService.getTasas().subscribe((resp: any) => {
      this.precio_dia = resp[0].precio_dia;
      this.precio_fecha = resp[0].created_at;
      this.isLoading = false;
    });
  }

  getInfoPago() {
    this.isLoading = true;
    this.paymentService
      .getPagosPendingbyStudent(this.event_id)
      .subscribe((resp: any) => {
        this.isLoading = false;
        // console.log(resp);
        this.deuda = resp[0].monto;
        this.parent_id = resp[0].parent_id;
        this.fecha = resp[0].fecha;
      });
  }

  getEvento() {
    this.isLoading = true;
    this.eventoService.getById(this.event_id).subscribe((resp: any) => {
      // console.log(resp);
      if (resp && resp.event) {
        this.evento = resp.event;
        this.precio_general = resp.event.precio_general;
        this.precio_estudiantes = resp.event.precio_estudiantes;
        this.precio_especialistas = resp.event.precio_especialistas;
        this.preciosEvento = [
          { precioevento: this.precio_general, precionombre: 'Precio General', precio: this.evento.precio_general },
          { precioevento: this.precio_estudiantes, precionombre: 'Precio Estudiantes', precio: this.evento.precio_estudiantes },
          { precioevento: this.precio_especialistas, precionombre: 'Precio Especialistas', precio: this.evento.precio_especialistas },
        ];
      } else {
        this.evento = {} as Evento;
        this.precio_general = 0;
        this.precio_estudiantes = 0;
        this.precio_especialistas = 0;
        this.preciosEvento = [];
      }
      this.isLoading = false;
    });
  }

  selectBanco(value?: any) {
    // console.log(value)
    this.bankselected = value;
  }
  selectPrecio(value?: any) {
    // console.log(value)
    this.preciopagar = value;
  }

  validarFormulario() {
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      metodo: ['', Validators.required],
      phone: [''],
      bank_name: ['', Validators.required],
      bank_destino: ['', Validators.required],
      monto: ['', Validators.required],
      referencia: ['', Validators.required],
      email: [this.usuario.email],
      nombre: [this.usuario.name],
      parent_id: [this.parent_id],
      event_id: [''],
      status: ['PENDING'],
      fecha: [''],
    });
  }

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

  updateForm() {
    const formData = new FormData();
    formData.append('phone', this.PaymentRegisterForm.get('phone')?.value);
    formData.append('metodo', this.PaymentRegisterForm.get('metodo')?.value);
    formData.append(
      'bank_name',
      this.PaymentRegisterForm.get('bank_name')?.value
    );
    formData.append(
      'bank_destino',
      this.PaymentRegisterForm.get('bank_destino')?.value
    );
    formData.append('monto', this.PaymentRegisterForm.get('monto')?.value);
    formData.append(
      'referencia',
      this.PaymentRegisterForm.get('referencia')?.value
    );
    formData.append('event_id', this.event_id + '');
    formData.append('client_id', this.usuario.id + '');
    formData.append('nombre', this.usuario.name);
    formData.append('email', this.usuario.email);
    formData.append('imagen', this.FILE_AVATAR);
    formData.append('status', 'PENDING');

    //crear
    this.isLoading = true;
    this.paymentService
      .pagarDeuda(formData, this.usuario.id, this.event_id)
      .subscribe((resp: any) => {
        this.pagoSeleccionado = resp;

        if (resp.message == 403) {
          // Swal.fire('Actualizado', this.text_validation, 'success');
          this.text_validation = resp.message_text;
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: this.text_validation,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // Swal.fire('Actualizado', this.text_success, 'success' );
          // this.text_success = 'La Cita medica se ha creado, favor espere la verificacion de  el pago';
          this.text_success =
            'Se Ha enviado el pago, favor espere la verificación';
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: this.text_success,
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
          this.router.navigateByUrl(`/app/mis-pagos`);
        }
      });

    return false;
  }

  selectedTypeCoupon(value: any) {
    this.metodo = value;
  }
}
