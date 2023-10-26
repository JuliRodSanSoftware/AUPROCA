import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDetailComponent } from './labor-detail.component';

describe('LaborDetailComponent', () => {
  let component: LaborDetailComponent;
  let fixture: ComponentFixture<LaborDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborDetailComponent]
    });
    fixture = TestBed.createComponent(LaborDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
