import { Component, inject, OnDestroy } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnDestroy {
  private scheduleService = inject(ScheduleService);
  
  get scheduleCourses() {
    return this.scheduleService.schedule();
  }
  
  get totalPoints() {
    return this.scheduleCourses.reduce((sum, c) => sum + c.points, 0);
  }
  
  displayedColumns: string[] = [];

  constructor() {
    this.updateDisplayedColumns();
    window.addEventListener('resize', () => this.updateDisplayedColumns());
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.updateDisplayedColumns());
  }

  removeCourse(courseCode: string) {
    this.scheduleService.removeCourse(courseCode);
  }

  updateDisplayedColumns() {
    if (window.innerWidth < 768) {
      this.displayedColumns = ['code', 'name', 'remove'];
    } else {
      this.displayedColumns = ['code', 'name', 'points', 'subject', 'syllabus', 'remove'];
    }
  }
}