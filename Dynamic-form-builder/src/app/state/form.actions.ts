import { createAction, props } from '@ngrx/store';
import { FormTemplate } from 'src/app/models/form.model';

export const loadForms = createAction('[Form List] Load Forms');
export const loadFormsSuccess = createAction(
  '[Form List] Load Forms Success',
  props<{ forms: FormTemplate[] }>()
);
export const deleteForm = createAction(
  '[Form List] Delete Form',
  props<{ formId: number }>()
);