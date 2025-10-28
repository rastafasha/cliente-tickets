import { Component } from '@angular/core';
import { MenuFooterComponent } from "../../../shared/menu-footer/menu-footer.component";
import { HeaderComponent } from '../../../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Payment } from '../../../models/payment';
import { Student } from '../../../models/student';
import { PaymentService } from '../../../services/payment.service';
import { ParentService } from '../../../services/parent-service.service';
import { Usuario } from '../../../models/usuario.model';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { StudentService } from '../../../services/student-service.service';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-payment-list',
  imports: [MenuFooterComponent,HeaderComponent,
    FormsModule,ReactiveFormsModule, NgFor, NgIf, LoadingComponent,
    RouterLink, CommonModule, BackButtnComponent, ImagenPipe,
    BarChartComponent
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {

  pageTitle = 'Pagos';
    isLoading = false;
    loading = false;
    usersCount = 0;
    students!: Student;
    payments!: Payment[]|null;
  
    p: number = 1;
    count: number = 8;
    userprofile!:Usuario;
  
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
    student!:Student;
  
    ServerUrl = environment.url_servicios;
  
    constructor(
      private parentService: ParentService,
      private paymentService: PaymentService,
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
      this.getPayments();
    }

    ngOnChanges(): void {
      if (this.userprofile && this.userprofile.id) {
        this.getPayments();
      }
    }

    getPayments(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        this.error = 'Parent profile is not defined.';
        return;
      }
      this.isLoading = true;
      this.paymentService.getPagosbyUser(this.userprofile.id).subscribe(
        (res: any) => {
          this.payments = res;
          this.isLoading = false;
          //recorremos payment para traer la info del studiante
        if (this.payments) {
          this.payments.forEach((payment: Payment) => {
            if (payment.student_id !== undefined) {
              this.studentService.getUserById(payment.student_id).subscribe((res: any) => {
                this.student = res;
                // console.log(this.student);

              });
            }
          });
        }
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
  
    search() {
      return this.paymentService.search(this.query).subscribe((res: any) => {
        this.payments = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getPayments();
      this.query = '';
    }

    cambiarStatus(data: any) {
    const VALUE = data.status;
    // console.log(VALUE);

    this.paymentService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
      // this.toaster.open({
      //   text:'Producto Actualizado!',
      //   caption:'Mensaje de Validación',
      //   type:'success',
      // })
      this.getPayments();
    });
  }

}
