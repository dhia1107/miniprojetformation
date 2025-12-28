import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDetails } from './formation-details';

describe('FormationDetails', () => {
  let component: FormationDetails;
  let fixture: ComponentFixture<FormationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
