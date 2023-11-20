import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborTypeComponent } from './labor-type.component';

describe('LaborTypeComponent', () => {
  let component: LaborTypeComponent;
  let fixture: ComponentFixture<LaborTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborTypeComponent]
    });
    fixture = TestBed.createComponent(LaborTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
