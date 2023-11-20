import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborTypeDetailComponent } from './labor-type-detail.component';

describe('LaborTypeDetailComponent', () => {
  let component: LaborTypeDetailComponent;
  let fixture: ComponentFixture<LaborTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborTypeDetailComponent]
    });
    fixture = TestBed.createComponent(LaborTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
