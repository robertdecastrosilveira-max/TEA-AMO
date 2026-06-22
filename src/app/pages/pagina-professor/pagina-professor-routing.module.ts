import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaProfessorPage } from './pagina-professor.page';
import { AuthGuard } from '../../guards/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: PaginaProfessorPage,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'professor'
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
export class PaginaProfessorPageRoutingModule {}
