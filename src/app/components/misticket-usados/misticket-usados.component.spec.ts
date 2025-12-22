import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisticketUsadosComponent } from './misticket-usados.component';

describe('MisticketUsadosComponent', () => {
  let component: MisticketUsadosComponent;
  let fixture: ComponentFixture<MisticketUsadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisticketUsadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisticketUsadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
