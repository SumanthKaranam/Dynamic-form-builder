import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { FormField } from 'src/app/models/form.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import DomSanitizer
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  @Output() formSaved = new EventEmitter<any>(); // Emit saved form data

  templates: { formGroup: FormGroup; formFields: any[]; preview?: SafeHtml; saved?: boolean }[] = [];
  formGroup: FormGroup;
  previewTemplate: SafeHtml | null = null; // Change type to SafeHtml

  // Defining available fields with proper types
  availableFields: FormField[] = [
    { type: 'text', label: 'Text Input', name: 'textInput', 
      id: '', required: false,
      helpText: 'Enter text here' },
    { type: 'textarea', label: 'Text Area', name: 'textArea', 
      id: '', required: false,
      helpText: 'Enter long text here' },
    {
      type: 'dropdown', label: 'Dropdown', name: 'dropdown', options: ['Option 1', 'Option 2'],
      id: '',
      required: false
    },
    {
      type: 'checkbox', label: 'Checkbox', name: 'checkbox',
      id: '',
      required: false
    },
    {
      type: 'radio', label: 'Radio Buttons', name: 'radio', options: ['Option A', 'Option B'],
      id: '',
      required: false
    },
    {
      type: 'date', label: 'Date Picker', name: 'datePicker',
      id: '',
      required: false
    }
  ];

  formFields: { type: string; label: string; name: string; helpText?: string; options?: string[] }[] = [];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private formService: FormService) { 
    this.formGroup = this.fb.group({});
  }

  // onFieldDrop(field: FormField) {
  //   // Remove the field from availableFields
  //   const index = this.availableFields.indexOf(field);
  //   if (index > -1) {
  //     this.availableFields.splice(index, 1);
  //   }

  //   // Ensure the field has a unique name
  //   const newField = { ...field, name: `${field.name}_${this.formFields.length}` };
  //   this.formFields.push(newField);
  //   this.formGroup.addControl(newField.name, new FormControl(''));
  // }

  onFieldDrop(field: FormField) {
    // Create a copy of the field to add to formFields
    const newField = { ...field, name: `${field.name}_${this.formFields.length}` };
    this.formFields.push(newField);
    this.formGroup.addControl(newField.name, new FormControl(''));
  }

  // removeField(index: number) {
  //   // Remove the field from formFields
  //   const field = this.formFields[index];
  //   this.formFields.splice(index, 1);
  //   this.formGroup.removeControl(field.name);

  //   // Add the field back to availableFields with its original properties, including the 'name'
  //   const { name, ...rest } = field; // Keep the name property (with unique suffix) for re-adding
  //   this.availableFields.push({
  //     name, ...rest,
  //     id: '',
  //     required: false,
  //     type: rest.type as 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio' | 'date'
  //   });
  // }

  // onDrop(event: CdkDragDrop<FormField[]>) {
  //   if (event.previousContainer === event.container) {
  //     // Reorder within the same container
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Transfer between containers
  //     const draggedField = event.previousContainer.data[event.previousIndex];

  //     if (event.container.id === 'availableFields') {
  //       // Dragging from formFields to availableFields (edit/remove field)
  //       this.removeField(event.previousIndex);
  //     } else if (event.container.id === 'formFields') {
  //       // Dragging from availableFields to formFields (add field)
  //       this.onFieldDrop(draggedField);
  //     }

  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  removeField(index: number) {
    // Remove the field from formFields
    const field = this.formFields[index];
    this.formFields.splice(index, 1);
    this.formGroup.removeControl(field.name);
  }

  onDrop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer between containers
      const draggedField = event.previousContainer.data[event.previousIndex];

      if (event.container.id === 'availableFields') {
        // Dragging from formFields to availableFields (edit/remove field)
        this.removeField(event.previousIndex);
      } else if (event.container.id === 'formFields') {
        // Dragging from availableFields to formFields (add field)
        this.onFieldDrop(draggedField);
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createTemplate() {
    let template = '<form>';
    this.formFields.forEach((field) => {
      if (field.type === 'text') {
        template += `<div><label>${field.label}</label><input type="text" placeholder="${field.helpText}" /></div>`;
      } else if (field.type === 'textarea') {
        template += `<div><label>${field.label}</label><textarea placeholder="${field.helpText}"></textarea></div>`;
      } else if (field.type === 'dropdown') {
        template += `<div><label>${field.label}</label><select>${field.options?.map(option => `<option>${option}</option>`).join('')}</select></div>`;
      } else if (field.type === 'checkbox') {
        template += `<div><label><input type="checkbox" /> ${field.label}</label></div>`;
      } else if (field.type === 'radio') {
        template += `<div><label>${field.label}</label>${field.options?.map(option => `<label><input type="radio" /> ${option}</label>`).join('')}</div>`;
      } else if (field.type === 'date') {
        template += `<div><label>${field.label}</label><input type="date" /></div>`;
      }
    });
    template += '</form>';

    const sanitizedTemplate = this.sanitizer.bypassSecurityTrustHtml(template);
    this.templates.push({ formGroup: this.fb.group({}), formFields: [...this.formFields], preview: sanitizedTemplate });
    this.formFields = [];
    this.formGroup = this.fb.group({});
  }

  addTemplate() {
    const newTemplate = {
      formGroup: this.fb.group({}),
      formFields: [] // Add default fields or leave empty
    };
    this.templates.push(newTemplate);
  }

  deleteTemplate(index: number) {
    this.templates.splice(index, 1);
  }

  saveTemplate(index: number) {
    const template = this.templates[index];
    console.log('Template Saved:', template);
    // Add logic to save the template (e.g., send to a server or store locally)

      // Mark the template as saved
  this.templates[index] = {
    ...template,
    saved: true // Add a saved property to indicate the template is saved
  };
   // Pass the saved template to the shared service
   this.formService.setFormData(this.templates[index]);
  }
  
}
