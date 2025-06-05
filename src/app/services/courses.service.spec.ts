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
        next: (data) => console.log('تم تحميل البيانات:', data),
        error: (err) => console.error('حدث خطأ أثناء التحميل:', err)
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'حدث خطأ غير معروف!';
    
    if (error.error instanceof ErrorEvent) {
      // خطأ من جانب العميل
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      // خطأ من الخادم
      errorMessage = `
        كود الخطأ: ${error.status}\n
        الرسالة: ${error.message}
      `;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}