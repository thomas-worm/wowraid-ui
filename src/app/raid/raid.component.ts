import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RaidEvent } from '../model/raidevent.model';
import { RaidService } from './raid.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  private raids: RaidEvent[];
  private _loading = new BehaviorSubject<boolean>(true);
  private loading: Observable<boolean>;

  constructor(
    private raidService: RaidService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loading = this._loading.asObservable();
    this._loading.next(true);
    this.raidService.getRaids().subscribe(events => {
      this.raids = events.sort(this.sortRaids);
      //this._loading.next(false);
    });
  }

  sortRaids(a: RaidEvent, b: RaidEvent): number {
    if (a.start_datetime === b.start_datetime) return 0;
    if (a.start_datetime < b.start_datetime) return 1;
    return -1;
  }

}
