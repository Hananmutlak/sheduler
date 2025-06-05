import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private readonly STORAGE_KEY = 'university_schedule';
  schedule = signal<Course[]>(this.loadFromStorage());

  private loadFromStorage(): Course[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addCourse(course: Course) {
    if (!this.isCourseExists(course)) {
      this.schedule.update(items => [...items, course]);
      this.saveToStorage();
    }
  }

  removeCourse(courseCode: string) {
    this.schedule.update(items => items.filter(c => c.courseCode !== courseCode));
    this.saveToStorage();
  }

  private isCourseExists(course: Course): boolean {
    return this.schedule().some(c => c.courseCode === course.courseCode);
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.schedule()));
  }

  get totalCredits(): number {
    return this.schedule().reduce((sum, c) => sum + c.points, 0);
  }
}