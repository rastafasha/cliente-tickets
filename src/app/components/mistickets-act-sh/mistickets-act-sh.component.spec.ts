import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisticketsActShComponent } from './mistickets-act-sh.component';

describe('MisticketsActShComponent', () => {
  let component: MisticketsActShComponent;
  let fixture: ComponentFixture<MisticketsActShComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisticketsActShComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisticketsActShComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
