import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSubject = new BehaviorSubject<'admin' | 'user' | null>(null);
  role$ = this.roleSubject.asObservable();

  private apiUrl = 'http://localhost:5000/users';
  private defaultAdminUsername = 'Sumanth'; // Default admin username
  private defaultAdminPassword = 'Sumanth@9'; // Default admin password

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.get<any[]>(this.apiUrl).subscribe(users => {
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        // Restrict admin login to default admin username and password
        if (user.role === 'admin' && (username !== this.defaultAdminUsername || password !== this.defaultAdminPassword)) {
          alert('Invalid credentials for admin!');
          return;
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.roleSubject.next(user.role);
        alert('Login successful!');
        this.router.navigate(user.role === 'admin' ? ['/form-builder'] : ['/form-list']);
      } else {
        alert('Invalid credentials!');
      }
    });
  }

  signup(user: { username: string; password: string; role: string }) {
    if (user.role === 'admin') {
      alert('You cannot create an account with the admin role!');
      return;
    }

    return this.http.post(this.apiUrl, user).subscribe(() => {
      alert('Signup successful!');
      this.router.navigate(['/login']);
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.roleSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRole(): 'admin' | 'user' | null {
    return this.roleSubject.value;
  }
}