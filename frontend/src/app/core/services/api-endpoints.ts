import { environment } from '../../../environments/environment';

export const ApiEndpoints = {
  elderly: `${environment.apiUrl}/elderlies`,
  volunteers: `${environment.apiUrl}/volunteers`,
  walks: `${environment.apiUrl}/walks`
} as const;