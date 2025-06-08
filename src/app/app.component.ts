// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleService } from './services/schedule.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  isLoaded = false;
  
  constructor(public scheduleService: ScheduleService) {}

  ngOnInit() {
    // محاكاة تحميل التطبيق
    setTimeout(() => {
      this.isLoaded = true;
    }, 1500);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  closeMenu() {
    this.menuOpen = false;
  }
}