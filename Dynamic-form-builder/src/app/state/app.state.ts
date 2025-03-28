import { FormState } from './form.reducer'; // Import the form state interface

export interface AppState {
  forms: FormState; // Add the form state slice
  // Add other state slices here if needed
}