import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ProfileService } from '../../services/profile.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { Parent } from '../../models/parents';
import { ParentService } from '../../services/parent-service.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    MenuFooterComponent,
    // LateralComponent,
    BackButtnComponent,
    LoadingComponent,
    TranslateModule,
    ImagenPipe
],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  pageTitle= 'Profile';
  public user!: any;
  public role!: any;
  public user_id!: number;
  public isLoading:boolean = false;
    loadingTitle!:string;

  public profile!: Client;

  

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) {
  }
  
  ngOnInit(): void {
    let USER = localStorage.getItem("user");
    this.user = USER ? JSON.parse(USER) : null;
    console.log(this.user)
    window.scrollTo(0, 0);
    
    this.getProfile();
  }

  getProfile(){
    this.isLoading = true;
    this.loadingTitle = 'Loading Profile...';
    this.clientService.getClient(this.user.id ).subscribe(
      (resp:any) => {
      this.profile = resp || null;
      this.isLoading = false;
    })
  }

 
  logout() {
    this.authService.logout();
  }



}
