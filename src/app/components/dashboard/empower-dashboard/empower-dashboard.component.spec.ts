import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpowerDashboardComponent } from './empower-dashboard.component';

describe('EmpowerDashboardComponent', () => {
  let component: EmpowerDashboardComponent;
  let fixture: ComponentFixture<EmpowerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpowerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpowerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
