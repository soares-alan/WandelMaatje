import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Page } from '../models/page.model';
import { Volunteer, VolunteerRequest } from '../models/volunteer.model';
import { ApiEndpoints } from './api-endpoints';

export interface VolunteerListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class VolunteerService {
  private readonly http = inject(HttpClient);

  getAll(params: VolunteerListParams = {}): Observable<Page<Volunteer>> {
    const httpParams = new HttpParams({
      fromObject: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'id',
        direction: params.direction ?? 'asc'
      }
    });

    return this.http.get<Page<Volunteer>>(ApiEndpoints.volunteers, { params: httpParams });
  }

  getById(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${ApiEndpoints.volunteers}/${id}`);
  }

  create(volunteer: VolunteerRequest): Observable<Volunteer> {
    return this.http.post<Volunteer>(ApiEndpoints.volunteers, volunteer);
  }

  update(id: number, volunteer: VolunteerRequest): Observable<Volunteer> {
    return this.http.put<Volunteer>(`${ApiEndpoints.volunteers}/${id}`, volunteer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiEndpoints.volunteers}/${id}`);
  }
}
