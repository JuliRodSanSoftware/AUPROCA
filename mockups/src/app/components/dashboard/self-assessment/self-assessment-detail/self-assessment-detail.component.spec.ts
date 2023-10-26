import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentDetailComponent } from './self-assessment-detail.component';

describe('SelfAssessmentDetailComponent', () => {
  let component: SelfAssessmentDetailComponent;
  let fixture: ComponentFixture<SelfAssessmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfAssessmentDetailComponent]
    });
    fixture = TestBed.createComponent(SelfAssessmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
