import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { LoginComponent } from './auth/login/login.component';
import { PaymentDetailComponent } from './pages/payment/payment-detail/payment-detail.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { StudentEditComponent } from './pages/students/student-edit/student-edit.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { PagarComponent } from './pages/payment/pagar/pagar.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    
    {path: 'search', component: SearchComponent},
    
    //user
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/settings', component: SettingsComponent},
    {path: 'profile/edit/:id', component: EditComponent},
    
    {path: 'pagar/:id', component: PagarComponent},
    {path: 'payments', component: PaymentListComponent},
    {path: 'payment-detail/:id', component: PaymentDetailComponent},

    {path: 'students', component: StudentListComponent},
    {path: 'students/:id', component: StudentDetailComponent},
    {path: 'student/add', component: StudentEditComponent},
    {path: 'student/edit/:id', component: StudentEditComponent},
    

    {path: '**', redirectTo: '', pathMatch: 'full'},
];
