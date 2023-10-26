import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelfAssessmentComponent } from './create-self-assessment.component';

describe('CreateSelfAssessmentComponent', () => {
  let component: CreateSelfAssessmentComponent;
  let fixture: ComponentFixture<CreateSelfAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSelfAssessmentComponent]
    });
    fixture = TestBed.createComponent(CreateSelfAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
