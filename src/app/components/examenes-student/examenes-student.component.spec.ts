import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesStudentComponent } from './examenes-student.component';

describe('ExamenesStudentComponent', () => {
  let component: ExamenesStudentComponent;
  let fixture: ComponentFixture<ExamenesStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenesStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
