import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisticketsEnviadosComponent } from './mistickets-enviados.component';

describe('MisticketsEnviadosComponent', () => {
  let component: MisticketsEnviadosComponent;
  let fixture: ComponentFixture<MisticketsEnviadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisticketsEnviadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisticketsEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
