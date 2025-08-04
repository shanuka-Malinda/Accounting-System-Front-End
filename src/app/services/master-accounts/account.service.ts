import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Account, CreateAccount } from '../../models/account';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAccounts(): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(`${this.apiUrl}/acc/all`).pipe(
      map(response => {
        return response; // Ensure payload matches ApiResponse<Account[]>
      }),
      retry(2),
      catchError(this.handleError)
    );
  }



  createAccount(account: CreateAccount) {
    return this.http.post(`${this.apiUrl}/acc/create`, account).pipe(
      map(response => {
        return response; // Ensure payload matches Account interface
      }),
      // retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    if (error.error && error.error.errorMessages) {
      return throwError(() => new Error(error.error.errorMessages.join(', ')));
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
