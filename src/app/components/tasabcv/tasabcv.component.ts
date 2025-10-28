import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Parent } from '../../models/parents';
import { AuthService } from '../../services/auth.service';
import { ParentService } from '../../services/parent-service.service';
import { ProfileService } from '../../services/profile.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { TasabcvService } from '../../services/tasabcv.service';
import { Tasabcv } from '../../models/tasabcba';

@Component({
  selector: 'app-tasabcv',
  imports: [ NgIf, LoadingComponent, TranslateModule, CommonModule],
  templateUrl: './tasabcv.component.html',
  styleUrl: './tasabcv.component.scss'
})
export class TasabcvComponent {
  
  isLoading:boolean = false;
  isProfile:boolean = false;
  public profile: Parent = new Parent();
  precio_dia!:number;
  precio_fecha!:Date;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private tasaBcvService: TasabcvService,
  ) {
  }
  ngOnInit() {
    this.getTasaDBcvdelDia();
    // console.log(this.user);
  }
  getTasaDBcvdelDia() {
    this.isLoading = true;
    this.tasaBcvService.getTasas().subscribe((resp:any)=>{
      this.precio_dia = resp[0].precio_dia
      this.precio_fecha = resp[0].created_at
      this.isLoading = false;
      // console.log(resp);
    })
  }
}
