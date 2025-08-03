import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { AccCategory, AccCategoryOnly } from '../../models/acc-category';

@Injectable({
  providedIn: 'root'
})
export class AccCategoryService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAccountGroups(): Observable<AccCategory[]> {
    return this.http.get<ApiResponse<AccCategory[][]>>(`${this.apiUrl}/acc/cat/all`).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.errorMessages.join(', ') || 'API call failed');
        }
        // Extract the inner array from the nested payload
        const accountGroups = response.payload && response.payload.length > 0 ? response.payload[0] : [];
        // console.log('API Response:', JSON.stringify(accountGroups));
        return accountGroups;
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  getAccountCategories(): Observable<AccCategoryOnly[]> {
    return this.http.get<ApiResponse<AccCategoryOnly[][]>>(`${this.apiUrl}/acc/cat/cat`).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.errorMessages.join(', ') || 'API call failed');
        }
        const accountGroups = response.payload && response.payload.length > 0 ? response.payload[0] : [];
        return accountGroups as AccCategoryOnly[];
      }),
      retry(2),
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

}
