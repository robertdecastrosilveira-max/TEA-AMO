import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaPessoalPage } from './ficha-pessoal.page';

const routes: Routes = [
  {
    path: '',
    component: FichaPessoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPessoalPageRoutingModule {}
