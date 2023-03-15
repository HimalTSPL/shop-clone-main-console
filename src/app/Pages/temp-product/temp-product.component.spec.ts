import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempProductComponent } from './temp-product.component';

describe('TempProductComponent', () => {
  let component: TempProductComponent;
  let fixture: ComponentFixture<TempProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
