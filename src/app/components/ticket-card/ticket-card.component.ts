import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ClientService } from '../../services/client.service';
import { TicketService } from '../../services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-card',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
})
export class TicketCardComponent implements OnInit {
  @Input() profile!: any;
  @Input() ticket!: any;

  isLoading: boolean = false;
  mostrarinfo: boolean = false;
  option_selectedd: number = 1;
  solicitud_selectedd: any = null;
  query: string = '';
  clients: any[] = [];

  showList: boolean = false;
  showButton: boolean = false;
  isloading: boolean = false;
  client_id: any = null;
  user: any = null;
  user_id: any = null;
  email: any = null;

  private clientService = inject(ClientService);
  private ticketService = inject(TicketService);
  private fb = inject(FormBuilder);

  tickets: any[] = [];
  invitacionForm!: FormGroup;

  ngOnInit(): void {
    let USER = localStorage.getItem('user');
    this.user = USER ? JSON.parse(USER) : null;
    this.user_id = this.user.id;
    this.validarFormularioPerfil();
  }

  compartir(client: any) {
    Swal.fire({
      title: 'Quieres compartir este ticket?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Quiero compartirlo',
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isloading = true;
        const data = {
          from_id: this.user_id,
          client_id: client.id,
          status: 'SHARED',
        };
        this.ticketService
          .compartirTicket(this.ticket.id, data)
          .subscribe((res: any) => {
            if (res.status === 'error') {
              //this.uploadError = res.message;
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrión un error, vuelva a intentar!',
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Se Compartió Correctamente!',
              });
              // this.router.navigateByUrl('/');
              this.isloading = false;
              this.PageSize();
            }
          });
      } else if (result.isDenied) {
        Swal.fire('Ningun cambio efectuado', '', 'info');
        // this.ngOnInit();
      }
    });
  }

  invitar(email: any) {
    Swal.fire({
      title: 'Quieres invitar a este correo?',
      text: email,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Invitar',
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isloading = true;
        const formData = new FormData();
        formData.append('email', this.invitacionForm.value.email);

        this.clientService.invitarCliente(formData).subscribe((res: any) => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Invitación En        viada Correctamente!',
            });
            // this.router.navigateByUrl('/');
            this.isloading = false;
            this.PageSize();
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Ningun cambio efectuado', '', 'info');
        // this.ngOnInit();
      }
    });
  }

  validarFormularioPerfil() {
    this.invitacionForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  abrirModalInfo() {
    this.mostrarinfo = true;
  }

  closemodalInfo() {
    this.mostrarinfo = false;
    this.ngOnInit();
  }

  optionSelected(value: number) {
    this.option_selectedd = value;
    if (this.option_selectedd === 1) {
      // this.ngOnInit();
    }
    if (this.option_selectedd === 2) {
      this.solicitud_selectedd = null;
    }
  }

  search() {
    return this.clientService.search(this.query).subscribe((res: any) => {
      this.clients = res;
      this.showList = true;
      if (!this.query) {
        this.ngOnInit();
        this.showList = false;
      }
    });
  }

  public PageSize(): void {
    this.query = '';
    this.showList = false;
  }
}
