
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem(this.USER_KEY);
  }

  login(credentials: any): Observable<any> {
    // Replace with your actual API endpoint
    // Example: return this.http.post('/api/login', credentials);

    // Mock API call
    return of({ email: credentials.email, name: 'Admin User' }).pipe(
      delay(1000),
      tap(user => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.isLoggedIn = true;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
