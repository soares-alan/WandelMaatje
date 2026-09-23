import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { Elderly } from '../../../../core/models/elderly.model';
import { Page } from '../../../../core/models/page.model';
import { Volunteer } from '../../../../core/models/volunteer.model';
import { Walk } from '../../../../core/models/walk.model';
import { ElderlyService } from '../../../../core/services/elderly.service';
import { VolunteerService } from '../../../../core/services/volunteer.service';
import { WalkService } from '../../../../core/services/walk.service';
import { DashboardComponent } from './dashboard';

function buildPage<T>(content: T[], totalElements: number): Page<T> {
  return {
    content,
    totalElements,
    totalPages: 1,
    size: content.length || 10,
    number: 0,
    first: true,
    last: true,
    empty: content.length === 0
  };
}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let elderlyServiceSpy: jasmine.SpyObj<ElderlyService>;
  let volunteerServiceSpy: jasmine.SpyObj<VolunteerService>;
  let walkServiceSpy: jasmine.SpyObj<WalkService>;

  const elderly: Elderly = { id: 1, name: 'Maria Jansen', age: 82, mobilityLevel: 'MEDIUM', notes: null };
  const volunteer: Volunteer = { id: 1, name: 'Ana Souza' };
  const walk: Walk = {
    id: 1,
    elderly,
    volunteer,
    walkDate: '2026-01-01',
    durationMinutes: 30,
    distanceKm: 2,
    painMood: 3,
    notes: null
  };

  beforeEach(async () => {
    elderlyServiceSpy = jasmine.createSpyObj('ElderlyService', ['getAll']);
    volunteerServiceSpy = jasmine.createSpyObj('VolunteerService', ['getAll']);
    walkServiceSpy = jasmine.createSpyObj('WalkService', ['getAll']);

    elderlyServiceSpy.getAll.and.returnValue(of(buildPage([elderly], 5)));
    volunteerServiceSpy.getAll.and.returnValue(of(buildPage([volunteer], 3)));
    walkServiceSpy.getAll.and.returnValue(of(buildPage([walk], 8)));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideTranslateService({ lang: 'en', fallbackLang: 'en' }),
        { provide: ElderlyService, useValue: elderlyServiceSpy },
        { provide: VolunteerService, useValue: volunteerServiceSpy },
        { provide: WalkService, useValue: walkServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render summary counts from the API', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const counts = Array.from(compiled.querySelectorAll('.summary-card__count')).map((el) =>
      el.textContent?.trim()
    );
    expect(counts).toEqual(['5', '3', '8']);
  });

  it('should render the recent walks table with data from the API', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.recent-walks-table')).toBeTruthy();
    expect(compiled.textContent).toContain('Maria Jansen');
  });

  it('should show an error message when a request fails', () => {
    walkServiceSpy.getAll.and.returnValue(throwError(() => new Error('network error')));
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.state--error')).toBeTruthy();
  });
});
