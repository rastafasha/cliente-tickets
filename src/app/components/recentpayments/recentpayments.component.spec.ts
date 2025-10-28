import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentpaymentsComponent } from './recentpayments.component';

describe('RecentpaymentsComponent', () => {
  let component: RecentpaymentsComponent;
  let fixture: ComponentFixture<RecentpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentpaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
