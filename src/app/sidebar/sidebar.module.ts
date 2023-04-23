import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [ RouterModule, CommonModule,
      MatSelectModule,
      MatListModule,
      MatSidenavModule,
      MatMenuModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatToolbarModule,
      MatRadioModule,
      MatProgressSpinnerModule,
      MatChipsModule,
      MatPaginatorModule,
      MatCheckboxModule,
      MatTableModule,
      MatGridListModule,
      FormsModule,
      MatInputModule,
      MatIconModule,
      MatTreeModule,
      MatButtonModule,
      MatProgressBarModule,
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MatAutocompleteModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})
export class SidebarModule {}
