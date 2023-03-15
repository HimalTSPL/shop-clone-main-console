import { TestBed } from '@angular/core/testing';

import { AuthoraztionService } from './authoraztion.service';

describe('AuthoraztionService', () => {
  let service: AuthoraztionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthoraztionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
