import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { StudentService } from '../../../services/student-service.service';
import { ParentService } from '../../../services/parent-service.service';
import { Parent } from '../../../models/parents';
import { Student } from '../../../models/student';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-payment-detail',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    HeaderComponent, MenuFooterComponent,BackButtnComponent, ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.scss'
})
export class PaymentDetailComponent {

  pageTitle = "Detalle Pago";
  payment!: Payment;
  error!: string;
  student_id!:number;
  parent_id!:number;
  parent!:Parent;
  student!:Student;
  isLoading:boolean=false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private studentService: StudentService,
    private parentService: ParentService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }
  getUser(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.payment = res;
        (error:any) => this.error = error
        console.log(this.payment);
      }
    );
  }

   getPagoById(id:number){
    this.isLoading= true;
    this.paymentService.getPagoById(id).subscribe(
      res=>{
        this.payment = res;
        // console.log(this.payment);
        this.parent_id = res.parent_id;
        this.student_id = res.student_id;
        this.isLoading = false;
        this.getParent();
        this.getStudent();
      }

    )
  }
  getParent(){
    this.parentService.getUserById(this.parent_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.parent = resp.representante;

    })
  }
  getStudent(){
    this.studentService.getUserById(this.student_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.student = resp.student;
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  
}
