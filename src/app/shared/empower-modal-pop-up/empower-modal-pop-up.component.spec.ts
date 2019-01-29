import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpowerModalPopUpComponent } from './empower-modal-pop-up.component';

describe('EmpowerModalPopUpComponent', () => {
  let component: EmpowerModalPopUpComponent;
  let fixture: ComponentFixture<EmpowerModalPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpowerModalPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpowerModalPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
