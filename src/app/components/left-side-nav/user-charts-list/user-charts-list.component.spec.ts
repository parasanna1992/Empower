import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartsListComponent } from './user-charts-list.component';

describe('UserChartsListComponent', () => {
  let component: UserChartsListComponent;
  let fixture: ComponentFixture<UserChartsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChartsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
