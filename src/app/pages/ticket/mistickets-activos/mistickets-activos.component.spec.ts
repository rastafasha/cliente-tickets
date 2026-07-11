import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisticketsActivosComponent } from './mistickets-activos.component';

describe('MisticketsActivosComponent', () => {
  let component: MisticketsActivosComponent;
  let fixture: ComponentFixture<MisticketsActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisticketsActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisticketsActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
