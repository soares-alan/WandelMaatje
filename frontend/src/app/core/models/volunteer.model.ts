export interface Volunteer {
  id: number;
  name: string;
}

// Matches the backend's VolunteerRequest DTO: create/update payloads never include the id.
export interface VolunteerRequest {
  name: string;
}
