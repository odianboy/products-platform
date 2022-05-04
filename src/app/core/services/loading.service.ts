import { Injectable } from '@angular/core';
import { endWith, interval, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  load(): Observable<string | number> {
    return interval(1000).pipe(
      take(5),
      map(tick => (tick + 1) * 20)
    );
  }

}
