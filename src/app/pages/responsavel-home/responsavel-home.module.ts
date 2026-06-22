import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ResponsavelHomePageRoutingModule } from './responsavel-home-routing.module';
import { ResponsavelHomePage } from './responsavel-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ResponsavelHomePageRoutingModule
  ],
  declarations: [ResponsavelHomePage]
})
export class ResponsavelHomePageModule {}