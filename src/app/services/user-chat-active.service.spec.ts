import { TestBed } from '@angular/core/testing';

import { UserChatActiveService } from './user-chat-active.service';

describe('UserChatActiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserChatActiveService = TestBed.get(UserChatActiveService);
    expect(service).toBeTruthy();
  });
});
