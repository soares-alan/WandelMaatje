import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Elderly, ElderlyRequest } from '../models/elderly.model';
import { Page } from '../models/page.model';
import { ApiEndpoints } from './api-endpoints';

export interface ElderlyListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class ElderlyService {
  private readonly http = inject(HttpClient);

  getAll(params: ElderlyListParams = {}): Observable<Page<Elderly>> {
    const httpParams = new HttpParams({
      fromObject: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'id',
        direction: params.direction ?? 'asc'
      }
    });

    return this.http.get<Page<Elderly>>(ApiEndpoints.elderly, { params: httpParams });
  }

  getById(id: number): Observable<Elderly> {
    return this.http.get<Elderly>(`${ApiEndpoints.elderly}/${id}`);
  }

  create(elderly: ElderlyRequest): Observable<Elderly> {
    return this.http.post<Elderly>(ApiEndpoints.elderly, elderly);
  }

  update(id: number, elderly: ElderlyRequest): Observable<Elderly> {
    return this.http.put<Elderly>(`${ApiEndpoints.elderly}/${id}`, elderly);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiEndpoints.elderly}/${id}`);
  }
}
