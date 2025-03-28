import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { LoginComponent } from './pages/login/login.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SignupComponent } from './pages/signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,    
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    AgGridAngular,
    DragDropModule,
    StoreModule.forRoot({}), // Root store (empty if using feature modules)
    EffectsModule.forRoot([]), // Root effects (empty if using feature modules)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
