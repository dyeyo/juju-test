import { TestBed } from '@angular/core/testing';

import { CharactesService } from './charactes.service';

describe('CharactesService', () => {
  let service: CharactesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
