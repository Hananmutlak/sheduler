import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component'; // تصحيح اسم الاستيراد

describe('CourseListComponent', () => { // تصحيح اسم الوصف
  let component: CourseListComponent; // تصحيح اسم النوع
  let fixture: ComponentFixture<CourseListComponent>; // تصحيح اسم النوع

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent] // تصحيح اسم المكون
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent); // تصحيح اسم المكون
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});