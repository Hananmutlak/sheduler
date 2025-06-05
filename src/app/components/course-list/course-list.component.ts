import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.model';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm = '';
  selectedSubject = 'all';
  displayedColumns: string[] = ['code', 'name', 'points', 'subject', 'syllabus', 'add'];

  constructor(
    public coursesService: CoursesService,
    public scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  get subjects(): string[] {
    return [...new Set(this.courses.map(c => c.subject))].sort();
  }

  applyFilters() {
    this.filteredCourses = this.courses.filter(c => {
      const subjectMatch = this.selectedSubject === 'all' || c.subject === this.selectedSubject;
      return subjectMatch;
    });
  }

  isCourseInSchedule(course: Course): boolean {
    return this.scheduleService.schedule().some(c => c.courseCode === course.courseCode);
  }
}