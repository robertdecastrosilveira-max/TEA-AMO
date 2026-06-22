import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FichaPessoalPageRoutingModule } from './ficha-pessoal-routing.module';
import { FichaPessoalPage } from './ficha-pessoal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaPessoalPageRoutingModule,
  ],
  declarations: [FichaPessoalPage]
})
export class FichaPessoalPageModule {}
