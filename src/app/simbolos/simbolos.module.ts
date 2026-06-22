import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimbolosPageRoutingModule } from './simbolos-routing.module';

import { SimbolosPage } from './simbolos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimbolosPageRoutingModule,
  ],
  declarations: [SimbolosPage]
})
export class SimbolosPageModule {}
