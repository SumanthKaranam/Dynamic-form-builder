import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormListComponent } from './form-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { formReducer } from 'src/app/state/form.reducer';
import { FormEffects } from 'src/app/state/form.effects';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: FormListComponent },
];

@NgModule({
  declarations: [FormListComponent],
  imports: [CommonModule, RouterModule.forChild(routes),
    StoreModule.forFeature('forms', formReducer),
    EffectsModule.forFeature([FormEffects]),
    ReactiveFormsModule
  ],
})
export class FormListModule {}