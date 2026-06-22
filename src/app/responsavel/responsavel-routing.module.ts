import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsavelPage } from './responsavel.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsavelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsavelPageRoutingModule {}
