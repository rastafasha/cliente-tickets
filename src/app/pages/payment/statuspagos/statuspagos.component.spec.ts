import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuspagosComponent } from './statuspagos.component';

describe('StatuspagosComponent', () => {
  let component: StatuspagosComponent;
  let fixture: ComponentFixture<StatuspagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatuspagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatuspagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
