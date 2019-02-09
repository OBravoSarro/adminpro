import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', component: NopagefoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes );
