import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payment } from '../../models/payment';
import { Student } from '../../models/student';
import { ParentService } from '../../services/parent-service.service';
import { PaymentService } from '../../services/payment.service';
import { StudentService } from '../../services/student-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterLink } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';

@Component({
  selector: 'app-listapaymentshijo',
  imports:[
    CommonModule, FormsModule, NgIf, NgFor, LoadingComponent, RouterLink,
    ImagenPipe
  ],
  templateUrl: './listapaymentshijo.component.html',
  styleUrls: ['./listapaymentshijo.component.css']
})
export class ListapaymentshijoComponent implements OnChanges {
   @Input() selectedStudentProfile!: Student;
    
      title = 'Padres';
    
      loading = false;
      usersCount = 0;
      students!: Student[]|null;
      payments!: Payment[]|null;
    
      p: number = 1;
      count: number = 8;
      isLoading = false;
      error!: string;
      selectedValue!: any;
      msm_error!: string;
      query: string = '';
    
      ServerUrl = environment.url_servicios;
    
      constructor(
        private parentService: ParentService,
        private paymentService: PaymentService,
        private studentService: StudentService,
        private http: HttpClient,
        handler: HttpBackend
      ) {
        this.http = new HttpClient(handler);
      }
    
      ngOnInit(): void {
        window.scrollTo(0, 0);
        
        
        // this.getPaymentsbyStudent();
      }

      ngOnChanges(changes: SimpleChanges): void {
        this.selectedStudentProfile;
        // console.log(this.selectedStudentProfile);
        if (changes['selectedStudentProfile'] && changes['selectedStudentProfile'].currentValue) {
          this.getPaymentsbyStudent();
        }
      }
    
      getPaymentsbyStudent(){
        this.isLoading = true;
        this.studentService.getPaymentById(this.selectedStudentProfile.id).subscribe((resp:any)=>{
          this.payments = resp.payments;
          this.isLoading = false;
          // console.log(this.payments);
        })
      }
    
      search() {
        return this.studentService.search(this.query).subscribe((res: any) => {
          // console.log(res);
          this.students = res;
          if (!this.query) {
            this.ngOnInit();
          }
        });
      }
    
      public PageSize(): void {
        this.getPaymentsbyStudent();
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
      this.getPaymentsbyStudent();
    });
  }
}
