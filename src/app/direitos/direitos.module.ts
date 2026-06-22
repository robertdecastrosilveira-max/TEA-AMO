import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DireitosPage } from './direitos.page';
import { DireitosPageRoutingModule } from './direitos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireitosPageRoutingModule,
  ],
  declarations: [DireitosPage],
})
export class DireitosPageModule {}
