import { Component, OnInit, signal } from '@angular/core';
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
import { ModalInstruccionesComponent } from '../../../components/modal-instrucciones/modal-instrucciones.component';
import { SkeletonLoaderComponent } from '../../../shared/skeleton-loader/skeleton-loader.component';
import { BackButtonComponent } from '../../../shared/back-button/back-button.component';

@Component({
  selector: 'app-pagar',
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    ModalInstruccionesComponent,
    SkeletonLoaderComponent,
    BackButtonComponent
  ],
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css'],
})
export class PagarComponent implements OnInit {
  public paymentForm!: FormGroup;
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
  paymentMethods: PaymentMethod[] = [];

  event_id!: number;
  parent_id!: number;
  fecha!: Date;

  precio_dia!: number;
  precio_general!: number;
  precio_estudiantes!: number;
  precio_especialistas!: number;
  
  precio_fecha!: Date;

  preciosEvento: any;
  bankselected: any = null;
  preciopagar: number = 0;

 // Signals
  evento = signal<any>(null); // Viene de la pantalla anterior
  tasa = signal(0);
  loading = signal(false);
  imagePreview = signal<string | null>(null);
  selectedFile: File | null = null;
  userId!: string;
  company_id!: number;
  paymentSelected!: any;
  amount: number | null = null;

  info = `
  <h2>Sección: Reportar Pago</h2>
  <p><strong>Nota importante:</strong> Actualmente no utilizamos pasarelas de pago directo. Cualquier actualización sobre métodos de pago automatizados será informada oportunamente a través de la <strong>Cartelera</strong> o <strong>Notificaciones</strong>.</p>
  
  <p>Para reportar tu pago con éxito, sigue estas instrucciones:</p>
  <ul>
    <li><strong>Seleccione el tipo de boleto:</strong> Al seleccionar tipo de boleto, el sistema te mostrará automáticamente el monto a pagar en bs y en divisa.</li>
    <li><strong>Datos de Transferencia:</strong> Al seleccionar tu método de pago preferido, el sistema te mostrará automáticamente los datos bancarios del beneficiario para que realices la operación desde tu banca en línea.</li>
    <li><strong>Registro de Información:</strong> Completa los campos solicitados: Banco de destino y los números o códigos de la <strong>Referencia Bancaria</strong>.</li>
    <li><strong>Monto del Pago:</strong> El monto ya viene predeterminado según la factura que seleccionaste; no es necesario modificarlo.</li>
    <li><strong>Comprobante Digital (Obligatorio):</strong> Es indispensable adjuntar la imagen o captura de pantalla de tu pago. Esto nos permite validar tu reporte de manera mucho más eficiente.</li>
  </ul>`;

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
    this.getTasadelDia();
    

    this.usuario = this.authService.user;
    // console.log(this.usuario);
    // this.getInfoPago();
    this.validarFormulario();
    
    this.isLoading =true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // 2. Obtenemos los datos extendidos (monto, nroFactura) del historial
    const state = window.history.state;
    if (id === 'deuda-total') {
      // Caso: Viene del Home con el monto acumulado
      if (state && state.evento) {
        this.evento.set(state.evento);
        this.paymentForm.patchValue({ amount: state.evento.totalPagar });
      }
    } else if (id && id !== 'nuevo') {
      // Caso: Viene de una factura específica
      if (state && state.evento) {
        this.evento.set(state.evento);
        this.paymentForm.patchValue({ amount: state.evento.totalPagar });
      } else {
        // Solo llamamos a la API si NO es 'deuda-total'
        this.eventoService.getById(+id).subscribe(resp => {
         const eventoData = resp['evento'] ? resp['evento'] : resp;
  
        this.evento.set(eventoData);
        
        // 2. Extraemos el company_id de forma segura
        this.event_id = eventoData['id'];
        this.company_id = eventoData['company_id'];
        
        console.log('Company ID encontrado con éxito:', this.company_id);
        
        this.paymentForm.patchValue({ amount: eventoData['totalPagar'] });
        this.getTiposdepagos();
        });
      }
    }
    this.isLoading =false;
  }
   getTasadelDia() {
    this.tasaBcvService.getUltimaTasa().subscribe((resp: any) => {
      this.tasa.set(resp.precio_dia);
    })
  }

  seleccionarPrecio(monto: number | undefined) {
  if (monto) {
    this.amount = monto;
    console.log('Monto seleccionado:', this.amount);
  }
}

  getTiposdepagos(): void {
    this.isLoading = true;
    // return this.planesService.carga_info();
    this.paymentMethodService
      .getPaymentMethodByTiendaId(this.company_id)
      .subscribe((resp: any) => {
        this.paymentMethods = resp;
        // console.log(resp);
        this.isLoading = false;
        (error: any) => (this.error = error);
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

  // metodo para el cambio del select 'tipo de transferencia'

  onChangePayment(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idSeleccionado = target.value;

    // Buscamos el objeto completo
    this.paymentSelected = this.paymentMethods.find(method => method.id === +idSeleccionado);

    if (this.paymentSelected) {
      // Seteamos automáticamente el valor en el campo 'bank_destino' del formulario
      this.paymentForm.patchValue({
        bank_destino: this.paymentSelected.bankName
      });
    }
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
    this.paymentForm = this.fb.group({
      id: [''],
      metodo: ['', Validators.required],
      phone: [''],
      bank_name: [''],
      bank_destino: [''],
      monto: ['', Validators.required],
      referencia: ['', Validators.required],
      email: [this.usuario.email],
      nombre: [this.usuario.name],
      parent_id: [this.parent_id],
      event_id: [''],
      company_id: [''],
      precio_dia: [''],
      amount: [''],
      status: ['PENDING'],
      fecha: [''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  loadFile($event: any) {
    // if ($event.target.files[0].type.indexOf('image')) {
    //   this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
    //   return;
    // }
    // this.text_validation = '';
    // this.FILE_AVATAR = $event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(this.FILE_AVATAR);
    // reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

  enviarPago() {
    const formData = new FormData();
    formData.append('metodo', this.paymentForm.get('metodo')?.value);
   
    formData.append('bank_name', this.paymentSelected.bankName);
    formData.append(
      'bank_destino',
      this.paymentForm.get('bank_destino')?.value
    );
    formData.append('monto', this.paymentForm.get('monto')?.value);
    formData.append(
      'referencia',
      this.paymentForm.get('referencia')?.value
    );
    formData.append('event_id', this.event_id + '');
    formData.append('company_id', this.company_id + '');
    formData.append('client_id', this.usuario.id + '');
    formData.append('nombre', this.usuario.name);
    formData.append('email', this.usuario.email);
    formData.append('imagen', this.selectedFile as Blob);
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
