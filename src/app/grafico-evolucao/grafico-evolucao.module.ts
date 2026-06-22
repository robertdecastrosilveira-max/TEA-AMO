import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoEvolucaoPageRoutingModule } from './grafico-evolucao-routing.module';

import { GraficoEvolucaoPage } from './grafico-evolucao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoEvolucaoPageRoutingModule,
  ],
  declarations: [GraficoEvolucaoPage]
})
export class GraficoEvolucaoPageModule {}
