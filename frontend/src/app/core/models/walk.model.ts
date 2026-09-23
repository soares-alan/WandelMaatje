import { Elderly } from './elderly.model';
import { Volunteer } from './volunteer.model';

export interface Walk {
  id: number;
  elderly: Elderly;
  volunteer: Volunteer;
  walkDate: string;
  durationMinutes: number;
  distanceKm: number;
  painMood: number;
  notes: string | null;
}

// Matches the backend's WalkRequest DTO: relations are sent as ids, not nested objects.
export interface WalkRequest {
  elderlyId: number;
  volunteerId: number;
  walkDate: string;
  durationMinutes: number;
  distanceKm: number;
  painMood: number;
  notes: string | null;
}
