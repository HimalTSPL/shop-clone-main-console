import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempAddComponent } from './temp-add.component';

describe('TempAddComponent', () => {
  let component: TempAddComponent;
  let fixture: ComponentFixture<TempAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
