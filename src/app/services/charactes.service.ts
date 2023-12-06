import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IFilters } from '../interfaces/IChareacters';

@Injectable({
  providedIn: 'root',
})
export class CharactesService {
  constructor(private http: HttpClient) {}

  getData(filters: IFilters, page: number) {
    return this.http.get(
      `${environment.url}character/?page=${page}&name=${filters.name}&gender=${filters.gender}`
    );
  }

  getDataById(id: number) {
    return this.http.get(`${environment.url}character/${id}`);
  }
}
