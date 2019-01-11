import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpowerActivitiesComponent } from './empower-activities.component';

describe('EmpowerActivitiesComponent', () => {
  let component: EmpowerActivitiesComponent;
  let fixture: ComponentFixture<EmpowerActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpowerActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpowerActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
