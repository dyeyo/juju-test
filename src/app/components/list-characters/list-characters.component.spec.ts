import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCharactersComponent } from './list-characters.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactesService } from '../../services/charactes.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { charactes } from '../../../mocks/api';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('ListCharactersComponent', () => {
  let component: ListCharactersComponent;
  let fixture: ComponentFixture<ListCharactersComponent>;
  let httpMock: HttpTestingController;
  let charatesServicesSpy: jasmine.SpyObj<CharactesService>;

  beforeEach(async () => {
    charatesServicesSpy = jasmine.createSpyObj('CharatesServices', ['getData']);

    await TestBed.configureTestingModule({
      imports: [
        ListCharactersComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: CharactesService, useValue: charatesServicesSpy },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCharactersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should increase the page number to 2', () => {
    spyOn(component, 'addPage');
    component.addPage(2);
    expect(component.addPage).toHaveBeenCalledWith(2);
  });

  it('should set loading to false after successful data retrieval', () => {
    const fakeData = charactes;
    charatesServicesSpy.getData.and.returnValue(of(fakeData));

    component.getDataCharacters(1);

    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.charactes).toEqual(fakeData.results);
    expect(component.info).toEqual(fakeData.info);
  });

  it('should set loading to false after an error during data retrieval', () => {
    const fakeError = new Error('Error en el servidor');
    charatesServicesSpy.getData.and.returnValue(throwError(fakeError));
    component.getDataCharacters(1);
    fixture.detectChanges();
    expect(component.loading).toBe(false);
  });
});
