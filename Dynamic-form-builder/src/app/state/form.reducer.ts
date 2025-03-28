import { createReducer, on } from '@ngrx/store';
import { loadFormsSuccess } from './form.actions';
import { FormTemplate } from 'src/app/models/form.model';

// Define the FormState interface
export interface FormState {
  list: any;
  forms: FormTemplate[]; // Array of form templates
}

// Initial state for the form slice
const initialState: FormState = {
    forms: [],
    list: undefined
};

// Create the reducer function
export const formReducer = createReducer(
  initialState,
  // Handle the loadFormsSuccess action to update the state with loaded forms
  on(loadFormsSuccess, (state, { forms }) => ({
    ...state,
    forms, // Update the forms array with the loaded forms
  }))
);