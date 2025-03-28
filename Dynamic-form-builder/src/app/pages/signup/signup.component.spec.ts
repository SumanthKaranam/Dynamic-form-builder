import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/service/auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['signup']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form with default values', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.get('username')?.value).toBe('');
    expect(component.signupForm.get('password')?.value).toBe('');
    expect(component.signupForm.get('role')?.value).toBe('');
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.signupForm.setValue({
      username: '',
      password: '',
      role: '',
    });
    expect(component.signupForm.invalid).toBeTrue();
  });

  it('should mark the form as valid if all fields are filled correctly', () => {
    component.signupForm.setValue({
      username: 'testuser',
      password: 'password123',
      role: 'admin',
    });
    expect(component.signupForm.valid).toBeTrue();
  });

  it('should not call AuthService.signup if the form is invalid', () => {
    component.signupForm.setValue({
      username: '',
      password: '',
      role: '',
    });
    component.onSignup();

    expect(authServiceSpy.signup).not.toHaveBeenCalled();
  });
});