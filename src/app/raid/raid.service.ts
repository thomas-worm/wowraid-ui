import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RaidEvent } from '../model/raidevent.model';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  private raids: BehaviorSubject<RaidEvent[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getRaids(): Observable<RaidEvent[]> {
    this.http.get<RaidEvent[]>(this.configService.APIURL + '/eventcategory/raid/event', {withCredentials: true}).subscribe(events => this.raids.next(events));
    return this.raids.asObservable();
  }

}
