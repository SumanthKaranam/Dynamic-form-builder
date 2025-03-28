import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormTemplate } from '../models/form.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:5000/forms'; // Replace with your API endpoint
  private formsSubject = new BehaviorSubject<FormTemplate[]>([]);
  forms$ = this.formsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadForms(): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(this.apiUrl).pipe(
      tap((forms) => this.formsSubject.next(forms)) // Update the BehaviorSubject
    );
  }

  addForm(form: FormTemplate): Observable<FormTemplate> {
    return this.http.post<FormTemplate>(this.apiUrl, form).pipe(
      tap((newForm) => {
        const currentForms = this.formsSubject.value;
        this.formsSubject.next([...currentForms, newForm]); // Add the new form to the list
      })
    );
  }

  deleteForm(formId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${formId}`).pipe(
      tap(() => {
        const currentForms = this.formsSubject.value;
        this.formsSubject.next(currentForms.filter((form) => form.id !== formId)); // Update the BehaviorSubject
      })
    );
  }

  setFormData(data: any) {
    this.formsSubject.next(data);
  }
}