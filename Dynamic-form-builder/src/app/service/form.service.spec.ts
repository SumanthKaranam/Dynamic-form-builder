import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';
import { AuthService } from './auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with default values', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as valid if all fields are filled correctly', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123',
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should not call AuthService.login if the form is invalid', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });
    component.onLogin();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeTrue();
  });
});