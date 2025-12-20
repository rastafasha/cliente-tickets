import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificadorComponent } from './notificador.component';

describe('NotificadorComponent', () => {
  let component: NotificadorComponent;
  let fixture: ComponentFixture<NotificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
