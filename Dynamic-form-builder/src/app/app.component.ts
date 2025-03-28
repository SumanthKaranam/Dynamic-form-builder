import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TestProject';
  isLoggedIn = false;
  savedForm: any; // Add this property if needed globally

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to role changes to track login state
    this.authService.role$.subscribe(role => {
      this.isLoggedIn = !!role; // If role is not null, user is logged in
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}