import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly API_URL = 'assets/miun_courses.json'; // المسار الصحيح

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL).pipe(
      retry(2), // إعادة المحاولة مرتين
      tap({
     next: (data) => console.log('Data har laddats:', data),
error: (err) => console.error('Ett fel inträffade vid laddning:', err)
}),
catchError(this.handleError)
);
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ett okänt fel har inträffat!';
  
  if (error.error instanceof ErrorEvent) {
    // Klientfel
    errorMessage = `Fel: ${error.error.message}`;
  } else {
    // Serverfel
    errorMessage = `
      Felkod: ${error.status}\n
      Meddelande: ${error.message}
    `;
  }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
