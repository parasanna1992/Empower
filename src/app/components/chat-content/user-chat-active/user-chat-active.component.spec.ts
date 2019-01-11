import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatActiveComponent } from './user-chat-active.component';

describe('UserChatActiveComponent', () => {
  let component: UserChatActiveComponent;
  let fixture: ComponentFixture<UserChatActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChatActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
