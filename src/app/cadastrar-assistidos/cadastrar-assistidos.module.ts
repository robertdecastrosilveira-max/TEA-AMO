import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CadastrarAssistidosPageRoutingModule } from './cadastrar-assistidos-routing.module';
import { CadastrarAssistidosPage } from './cadastrar-assistidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarAssistidosPageRoutingModule
  ],
  declarations: [CadastrarAssistidosPage]
})
export class CadastrarAssistidosPageModule {}