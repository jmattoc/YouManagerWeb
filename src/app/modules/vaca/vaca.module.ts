import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { FormContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecoRoutingModule } from '@modules/reco/reco-routing.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {BandejvacaComponent} from './pages/bandejvaca/bandejvaca.component';
import {NewvacaComponent} from './pages/newvaca/newvaca.component';
import {vacaRoutingModule} from '@modules/vaca/vaca-routing.module';
@NgModule({
  declarations:[ BandejvacaComponent,NewvacaComponent],
  imports: [
    BreadcrumbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatNativeDateModule,
    RecoRoutingModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTreeModule,
    MatProgressBarModule,
    MatCheckboxModule,
    vacaRoutingModule,
  ],
  bootstrap: [BandejvacaComponent,NewvacaComponent],
  providers: [DatePipe],

})

export class Vacamodule { }
