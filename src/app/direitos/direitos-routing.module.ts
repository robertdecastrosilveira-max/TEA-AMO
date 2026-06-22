import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireitosPage } from './direitos.page';

const routes: Routes = [
  {
    path: '',
    component: DireitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireitosPageRoutingModule {}
