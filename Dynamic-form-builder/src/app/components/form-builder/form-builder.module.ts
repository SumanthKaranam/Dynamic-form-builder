import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  { path: '', component: FormBuilderComponent },
];

@NgModule({
  declarations: [FormBuilderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class FormBuilderModule {}