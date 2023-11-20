import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaborTypeComponent } from './create-labor-type.component';

describe('CreateLaborTypeComponent', () => {
  let component: CreateLaborTypeComponent;
  let fixture: ComponentFixture<CreateLaborTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLaborTypeComponent]
    });
    fixture = TestBed.createComponent(CreateLaborTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
