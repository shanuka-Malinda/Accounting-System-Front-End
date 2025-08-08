import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountReportService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAccountReport(data:any){
    return this.http.post(`${this.apiUrl}/sup/all/filter`, data).pipe(
      map(response => {
        return response;
      }),  
      // retry(2),
      catchError(this.handleError)  
    );
  }

  getAccountReportByAcc(data:any){
    return this.http.post(`${this.apiUrl}/sup/all/filter/acc`, data).pipe(
      map(response => {
        return response;
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
