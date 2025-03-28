import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormBuilderComponent } from './form-builder.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [
        ReactiveFormsModule,
        DragDropModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
      ],
      providers: [FormBuilder, DomSanitizer],
    });
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize available fields', () => {
    expect(component.availableFields.length).toBeGreaterThan(0);
  });

  it('should add a new field to the form', () => {
    const initialLength = component.templates.length;
    component.templates.push({
      formGroup: component.formGroup,
      formFields: [],
    });
    expect(component.templates.length).toBe(initialLength + 1);
  });

  it('should emit formSaved event when saving a form', () => {
    spyOn(component.formSaved, 'emit');
    const mockFormData = { name: 'Test Form', fields: [] };
    component.formSaved.emit(mockFormData);
    expect(component.formSaved.emit).toHaveBeenCalledWith(mockFormData);
  });

  it('should handle drag-and-drop events', () => {
    const mockEvent = {
      previousContainer: { data: ['field1', 'field2'] },
      container: { data: [] },
      previousIndex: 0,
      currentIndex: 0,
    } as any;
    component.onDrop(mockEvent);
    expect(mockEvent.container.data.length).toBe(1);
  });
});