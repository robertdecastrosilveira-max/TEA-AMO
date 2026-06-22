import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PaginaMedicoPageRoutingModule } from './pagina-medico-routing.module';
import { PaginaMedicoPage } from './pagina-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    PaginaMedicoPageRoutingModule
  ],
  declarations: [PaginaMedicoPage]
})
export class PaginaMedicoPageModule {}