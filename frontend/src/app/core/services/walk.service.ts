import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Page } from '../models/page.model';
import { Walk, WalkRequest } from '../models/walk.model';
import { ApiEndpoints } from './api-endpoints';

export interface WalkListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class WalkService {
  private readonly http = inject(HttpClient);

  getAll(params: WalkListParams = {}): Observable<Page<Walk>> {
    const httpParams = new HttpParams({
      fromObject: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'id',
        direction: params.direction ?? 'asc'
      }
    });

    return this.http.get<Page<Walk>>(ApiEndpoints.walks, { params: httpParams });
  }

  getById(id: number): Observable<Walk> {
    return this.http.get<Walk>(`${ApiEndpoints.walks}/${id}`);
  }

  create(walk: WalkRequest): Observable<Walk> {
    return this.http.post<Walk>(ApiEndpoints.walks, walk);
  }

  update(id: number, walk: WalkRequest): Observable<Walk> {
    return this.http.put<Walk>(`${ApiEndpoints.walks}/${id}`, walk);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiEndpoints.walks}/${id}`);
  }
}
