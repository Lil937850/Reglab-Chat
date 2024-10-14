import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AppRoutes } from './consts/routes';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: AppRoutes.MAIN, component: ChatPageComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: AppRoutes.MAIN } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }