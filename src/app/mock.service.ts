import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private http: HttpClient) {}

  livenessInit(sessionId: string, nmoves: string): Observable<any> {
    let data = { "moves": ['Right', 'Center', 'Left', 'Center', 'Right', 'Center']};

    return this.http.post('https://httpbin.org/post', data);

    /*
    return of({
      esito: 'OK',
      errorCode: null,
      errorDescription: null,
      key: 'ADFTG453',
      moves: ['Right', 'Center', 'Left', 'Center', 'Right', 'Center'],
    });
    */
  }

}
