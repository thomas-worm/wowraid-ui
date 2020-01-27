import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RaidEvent } from '../model/raidevent.model';

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  private raids: BehaviorSubject<RaidEvent[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
  }

  getRaids(): Observable<RaidEvent[]> {
    this.http.get<RaidEvent[]>('https://wowraid-api.herokuapp.com/eventcategory/raid/event', {withCredentials: true}).subscribe(events => this.raids.next(events));
    return this.raids.asObservable();
  }

}