import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisticketsComponent } from './mistickets.component';

describe('MisticketsComponent', () => {
  let component: MisticketsComponent;
  let fixture: ComponentFixture<MisticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisticketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
