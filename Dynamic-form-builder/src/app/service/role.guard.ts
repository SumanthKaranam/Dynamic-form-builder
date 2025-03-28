import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Role defined in route data
    const userRole = this.authService.getRole();// Get the user's role from AuthService
    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);
    if (userRole && (userRole === expectedRole || expectedRole === 'user')) {
        return true;
      }
  
      // Redirect to login if the role doesn't match or the user is not logged in
      this.router.navigate(['/login']);
      return false;
  }
}