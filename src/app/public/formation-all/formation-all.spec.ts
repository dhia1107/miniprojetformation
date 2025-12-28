import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationAll } from './formation-all';

describe('FormationAll', () => {
  let component: FormationAll;
  let fixture: ComponentFixture<FormationAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
