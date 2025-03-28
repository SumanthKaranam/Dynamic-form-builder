import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {
  @Input() savedForm: any; // Receive the saved form data
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private formService: FormService) {
    this.formGroup = this.fb.group({});
  }

  ngOnChanges() {
    console.log('Saved Form:', this.savedForm); // Debugging
    if (this.savedForm) {
      this.formGroup = this.fb.group({});
      this.savedForm.formFields.forEach((field: any) => {
        this.formGroup.addControl(field.name, new FormControl(''));
      });
    }
  }

  onSubmit() {
    const formData = this.formGroup.value;
    console.log('Form Submitted:', formData);

    // Save the form data to db.json using HttpClient
    this.http.post('http://localhost:5000/forms', formData).subscribe((response) => {
      console.log('Form data saved to db.json:', response);
    });
  }

  ngOnInit() {
    this.formService.forms$.subscribe((data) => {
      if (data) {
        console.log('Received Form Data:', data);
        this.savedForm = data;
        this.formGroup = this.fb.group({});
        this.savedForm.formFields.forEach((field: any) => {
          this.formGroup.addControl(field.name, new FormControl(''));
        });
      }
    });
  }
}