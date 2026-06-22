import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarAssistidosPage } from './cadastrar-assistidos.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarAssistidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarAssistidosPageRoutingModule {}
