import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapaymentshijoComponent } from './listapaymentshijo.component';

describe('ListapaymentshijoComponent', () => {
  let component: ListapaymentshijoComponent;
  let fixture: ComponentFixture<ListapaymentshijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapaymentshijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapaymentshijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
