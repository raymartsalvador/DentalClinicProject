import { TestBed } from '@angular/core/testing';

import { UserCrud} from './user-crud.service';

describe('UserCrudService', () => {
  let service: UserCrud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCrud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
