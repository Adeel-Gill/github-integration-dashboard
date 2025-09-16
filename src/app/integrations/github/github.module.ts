import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRoutingModule } from './github-routing.module';
import { GithubPanelComponent } from './components/github-panel/github-panel.component';
import { GithubConnectComponent } from './components/github-connect/github-connect.component';
import { GithubStatusComponent } from './components/github-status/github-status.component';
import { GithubCallbackComponent } from './components/github-callback/github-callback.component';
import { AgGridViewComponent } from './components/ag-grid-view/ag-grid-view.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatCardModule }   from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';

// AG Grid import
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    GithubPanelComponent,
    GithubConnectComponent,
    GithubStatusComponent,
    GithubCallbackComponent,
    AgGridViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    GithubRoutingModule,

    // Material modules
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    // AG Grid
    AgGridModule
  ]
})
export class GithubModule {}
