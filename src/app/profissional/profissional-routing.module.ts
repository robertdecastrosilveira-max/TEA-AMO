import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalPage } from './profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfissionalPageRoutingModule {}
