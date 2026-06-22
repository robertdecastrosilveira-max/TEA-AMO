import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsavelHomePage } from './responsavel-home.page';
import { AuthGuard } from '../../guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: ResponsavelHomePage,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'responsavel'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsavelHomePageRoutingModule {}