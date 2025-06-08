import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm = '';
  selectedSubject = 'all';
  sortBy = 'code'; // إضافة متغير الترتيب
  displayedColumns: string[] = [];
  subjects: string[] = [];
 isLoaded = false;
  constructor(
    public coursesService: CoursesService,
    public scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.updateDisplayedColumns();
    window.addEventListener('resize', () => this.updateDisplayedColumns());
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.updateDisplayedColumns());
  }

  private loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = [...data];
        this.subjects = [...new Set(data.map(c => c.subject))].sort();
        this.applyFilters(); // تطبيق الفلاتر والترتيب الأولي
      },
      error: (err) => console.error('Error:', err)
    });
  }

  applySorting() {
    this.filteredCourses.sort((a, b) => {
      switch (this.sortBy) {
        case 'code': 
          return a.courseCode.localeCompare(b.courseCode);
        case 'name': 
          return a.courseName.localeCompare(b.courseName);
        case 'points': 
          return b.points - a.points; // من الأعلى إلى الأقل
        default: 
          return 0;
      }
    });
  }

  applyFilters() {
    this.filteredCourses = this.courses.filter(c => {
      const subjectMatch = this.selectedSubject === 'all' || c.subject === this.selectedSubject;
      const searchMatch = this.searchTerm 
        ? c.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          c.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      
      return subjectMatch && searchMatch;
    });
    
    this.applySorting(); // تطبيق الترتيب بعد الفلترة
  }

  isCourseInSchedule(course: Course): boolean {
    return this.scheduleService.schedule().some(c => c.courseCode === course.courseCode);
  }

  updateDisplayedColumns() {
    if (window.innerWidth < 768) {
      this.displayedColumns = ['code', 'name', 'add'];
    } else {
      this.displayedColumns = ['code', 'name', 'points', 'subject', 'syllabus', 'add'];
    }
  }
}