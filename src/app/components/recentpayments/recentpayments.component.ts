import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment, students_with_debt } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { StudentService } from '../../services/student-service.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-recentpayments',
  imports:[
    CommonModule, FormsModule, NgIf, NgFor, LoadingComponent, RouterLink
  ],
  templateUrl: './recentpayments.component.html',
  styleUrls: ['./recentpayments.component.scss'],
})
export class RecentpaymentsComponent {
  title = 'Pagos';

  payments!: Payment[]|null;
  error!: string;
  p: number = 1;
  count: number = 8;
  isLoading:boolean = false;
  public user;
  query: string = '';
  student_id!:number;
  student!:Student;
  parent_has_debt!:boolean;

  student_with_debt: students_with_debt[] = [];

  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    private studentService: StudentService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getDeudas();
    },2000)
    window.scrollTo(0, 0);
    // console.log(this.user);
    // this.getPagos_list();
  }

  
  getDeudas(): void {
    this.isLoading = true;
    this.paymentService.getPagosStatusbyUser(this.user.id).subscribe((res: any) => {
      this.student_with_debt = res.students_with_debt;
      this.parent_has_debt = res.parent_has_debt;
      (error:any) => (this.error = error);
      this.isLoading = false;
        // console.log(this.student_with_debt);
       
    })
  }
  

  getStudent(){
    this.studentService.getUserById(this.student_id).subscribe((res: any) =>{
      console.log(res);
      })
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
    this.getDeudas();
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
      this.getDeudas();
    });
  }
}
