import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfissionalPageRoutingModule } from './profissional-routing.module';

import { ProfissionalPage } from './profissional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfissionalPageRoutingModule
  ],
  declarations: [ProfissionalPage]
})
export class ProfissionalPageModule {}
