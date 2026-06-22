import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaginaProfessorPageRoutingModule } from './pagina-professor-routing.module';
import { PaginaProfessorPage } from './pagina-professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaProfessorPageRoutingModule,
  ],
  declarations: [PaginaProfessorPage]
})
export class PaginaProfessorPageModule {}