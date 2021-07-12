import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomeComponent},
  { 
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then(m => m.TrainingModule),
      canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
