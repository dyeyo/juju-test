import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CharactesService } from './charactes.service';
import { charactes } from './../../mocks/api';

describe('CharactesService', () => {
  let service: CharactesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CharactesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return list to charactes', () => {
    const responseObj = charactes;

    service.getData({ name: '', gender: '' }, 1).subscribe((res) => {
      expect(res).toEqual(responseObj);
    });

    const req = httpMock.expectOne(
      'https://rickandmortyapi.com/api/character/?page=1&name=&gender='
    );
    req.flush(responseObj);
  });
});
