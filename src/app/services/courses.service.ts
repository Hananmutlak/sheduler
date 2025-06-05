import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly API_URL = '/assets/miun_courses.json';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(this.API_URL).pipe(
      catchError(error => {
        console.error('Error loading courses:', error);
        return of([]);
      })
    );
  }
}