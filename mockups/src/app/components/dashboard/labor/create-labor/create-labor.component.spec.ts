import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaborComponent } from './create-labor.component';

describe('CreateLaborComponent', () => {
  let component: CreateLaborComponent;
  let fixture: ComponentFixture<CreateLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLaborComponent]
    });
    fixture = TestBed.createComponent(CreateLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
