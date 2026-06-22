import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimbolosPage } from './simbolos.page';

const routes: Routes = [
  {
    path: '',
    component: SimbolosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimbolosPageRoutingModule {}
