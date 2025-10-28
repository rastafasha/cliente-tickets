import { NgIf, CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Parent } from '../../models/parents';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { TasabcvService } from '../../services/tasabcv.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PaymentService } from '../../services/payment.service';
import { StudentWithDebt } from '../../models/payment';

@Component({
  selector: 'app-statuspagos',
  imports: [ NgIf, LoadingComponent, TranslateModule, CommonModule, NgFor],
  templateUrl: './statuspagos.component.html',
  styleUrl: './statuspagos.component.scss'
})
export class StatuspagosComponent {
  @Input() user!:  Parent;
  
   isLoading:boolean = false;
    isProfile:boolean = false;
    parent_has_debt:boolean = false;
    student_has_debt:boolean = false;
    public profile: Parent = new Parent();
    parent_debt_amount!:number;
    student_debt_amount!:number;
    precio_fecha!:Date;
    
    student_with_debt: StudentWithDebt[] = [];

    constructor(
      private authService: AuthService,
      private paymentService: PaymentService,
    ) {
      this.user = this.authService.getUser();
    }

      
    ngOnInit() {
      this.getTasaDBcvdelDia();
      // console.log(this.user);
    }
    getTasaDBcvdelDia() {
      this.isLoading = true;
      this.paymentService.getPagosStatusbyUser(this.user.id).subscribe((resp:any)=>{
        this.parent_has_debt = resp.parent_has_debt
        this.parent_debt_amount = resp.parent_debt_amount
        this.student_with_debt = resp.students_with_debt
        this.isLoading = false;

        // console.log(this.student_with_debt);
      })
    }

    public PageSize(): void {
      this.getTasaDBcvdelDia();
  }
}


