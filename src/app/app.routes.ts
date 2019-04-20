import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: PagesComponent, canActivate:[AuthGuard], loadChildren: './pages/pages.module#PagesModule' },
  { path: 'not-found', component: NopagefoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes );
