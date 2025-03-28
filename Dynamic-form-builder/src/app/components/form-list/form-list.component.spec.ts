import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormListComponent } from './form-list.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormService } from 'src/app/service/form.service';

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormListComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, FormService],
    });
    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize an empty form group', () => {
    expect(component.formGroup instanceof FormGroup).toBeTrue();
    expect(Object.keys(component.formGroup.controls).length).toBe(0);
  });

  it('should update form group when savedForm changes', () => {
    const mockSavedForm = {
      formFields: [
        { name: 'field1' },
        { name: 'field2' },
      ],
    };
    component.savedForm = mockSavedForm;
    component.ngOnChanges();
    expect(Object.keys(component.formGroup.controls)).toEqual(['field1', 'field2']);
  });

  it('should log form data and send a POST request on submit', () => {
    const mockSavedForm = {
      formFields: [
        { name: 'field1' },
        { name: 'field2' },
      ],
    };
    component.savedForm = mockSavedForm;
    component.ngOnChanges();

    component.formGroup.controls['field1'].setValue('value1');
    component.formGroup.controls['field2'].setValue('value2');

    spyOn(console, 'log');
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/forms');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      field1: 'value1',
      field2: 'value2',
    });

    req.flush({ success: true });
    expect(console.log).toHaveBeenCalledWith('Form Submitted:', {
      field1: 'value1',
      field2: 'value2',
    });
    expect(console.log).toHaveBeenCalledWith('Form data saved to db.json:', { success: true });
  });

  it('should handle empty savedForm gracefully', () => {
    component.savedForm = null;
    component.ngOnChanges();
    expect(Object.keys(component.formGroup.controls).length).toBe(0);
  });
});