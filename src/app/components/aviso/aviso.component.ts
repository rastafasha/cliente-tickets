import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-aviso',
  imports: [RouterLink, NgIf, LoadingComponent, TranslateModule],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css'
})
export class AvisoComponent {
  @Input() user!:  any;
  // @Input() profile!: Profile;
  role!: any;
  user_id!: number;
  isLoading:boolean = false;
  isProfile:boolean = false;
  public profile: Client = new Client();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private clientService: ClientService,
  ) {
  }
  ngOnInit() {
    let USER = localStorage.getItem("user");
     if (USER) {
      try {
        this.user = JSON.parse(USER);
        this.role = this.user.roles && this.user.roles.length > 0 ? this.user.roles[0] : '';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.user = null;
        this.role = '';
      }
    } else {
      this.user = null;
      this.role = '';
    }
    this.getProfile();
    // console.log(this.user);
  }
  getProfile() {
    this.isLoading = true;
    // The service expects a Client object; pass a minimal object with id and cast to the expected type
    this.clientService.getClient(this.user.id).subscribe({
      next: (res) => {
        this.profile = res || null;
        // console.log(this.profile);
        this.isLoading = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoading = false;
      }
    });
  }
}
