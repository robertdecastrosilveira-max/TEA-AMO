import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaMedicoPage } from './pagina-medico.page';
import { AuthGuard } from '../../guards/auth-guard'; 


const routes: Routes = [
  {
    path: '',
    component: PaginaMedicoPage,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'medico'
    },
    children: [
      { path: 'home', loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule) },
      { path: 'alerta', loadChildren: () => import('../../alerta/alerta.module').then(m => m.AlertaPageModule) },
      { path: 'direitos', loadChildren: () => import('../../direitos/direitos.module').then(m => m.DireitosPageModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaMedicoPageRoutingModule {}
