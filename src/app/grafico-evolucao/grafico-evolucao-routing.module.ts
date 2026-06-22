import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoEvolucaoPage } from './grafico-evolucao.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoEvolucaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoEvolucaoPageRoutingModule {}
