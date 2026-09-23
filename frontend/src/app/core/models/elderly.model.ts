import { MobilityLevel } from './mobility-level.model';

export interface Elderly {
  id: number;
  name: string;
  age: number;
  mobilityLevel: MobilityLevel;
  notes: string | null;
}

// Matches the backend's ElderlyRequest DTO: create/update payloads never include the id.
export interface ElderlyRequest {
  name: string;
  age: number;
  mobilityLevel: MobilityLevel;
  notes: string | null;
}