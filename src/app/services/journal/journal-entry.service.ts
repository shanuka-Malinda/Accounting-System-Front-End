import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { JournalEntry } from '../../models/journal-entry';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createJournalEntry(entry: any) {
    return this.http.post(`${this.apiUrl}/sup/create-journal`, entry).pipe(
      map(response => {
        return response; // Ensure payload matches JournalEntry interface
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
