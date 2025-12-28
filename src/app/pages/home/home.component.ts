import { Component, HostListener, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile.model';
import { Router } from '@angular/router';
import { Parent } from '../../models/parents';
import { TasabcvComponent } from "../../components/tasabcv/tasabcv.component";
import { RecentpaymentsComponent } from '../../components/recentpayments/recentpayments.component';
import { StatuspagosComponent } from '../../components/statuspagos/statuspagos.component';
import { Client } from '../../models/client.model';
import { SliderComponent } from "../../shared/slider/slider.component";
import { PublicidadComponent } from '../../components/publicidad/publicidad.component';
import { NotificadorComponent } from "../../shared/notificador/notificador.component";
import { CategoryBarComponent } from "../../components/category-bar/category-bar.component";

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    MenuFooterComponent,
    // AvisoComponent,
    CommonModule,
    // BackButtnComponent,
    TranslateModule,
    // TasabcvComponent,
    SliderComponent,
    PublicidadComponent,
    NotificadorComponent,
    CategoryBarComponent
],
  providers: [TranslateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageTitle = 'Home';
  user!: Client;
  users: any = [];
  profile: Profile = new Profile();

  private translate = inject(TranslateService);
  
  constructor(
    private authService: AuthService,
    private router: Router,
    

  ){
    // this.user = this.authService.getUser();
    this.translate.use('es'); // Set default language
  }

  ngOnInit(){
    window.scrollTo(0, 0);
  }

  searchData(){
    this.router.navigateByUrl('/search');
  }

}
