export interface FormField {
    type: string;
    label: string;
    name: string;
    helpText?: string;
    options?: string[];
    id?: string;
    required?: boolean;
  }
  
  export interface FormTemplate {
    id: number;
    name: string;
    fields: FormField[];
  }
  