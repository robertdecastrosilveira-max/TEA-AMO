import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsavelPageRoutingModule } from './responsavel-routing.module';

import { ResponsavelPage } from './responsavel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsavelPageRoutingModule,
  ],
  declarations: [ResponsavelPage]
})
export class ResponsavelPageModule {}
