import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleService } from './services/schedule.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public scheduleService: ScheduleService) {}
}