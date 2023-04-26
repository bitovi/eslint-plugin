import { Observable } from 'rxjs';

export function getObs(): Observable<string> {
  return new Observable<string>();
}
