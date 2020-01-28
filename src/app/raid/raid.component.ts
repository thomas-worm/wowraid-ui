import { Component, OnInit } from '@angular/core';
import { RaidEvent } from '../model/raidevent.model';
import { RaidService } from './raid.service';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  private raids: RaidEvent[];
  private loading: boolean = true;

  constructor(
    private raidService: RaidService
  ) { }

  ngOnInit() {
    console.log(this.loading);
    this.loading = true;
    console.log(this.loading);
    this.raidService.getRaids().subscribe(events => {
      this.raids = events.sort(this.sortRaids);
      console.log(this.loading);
      this.loading = false;
      console.log(this.loading);
    });
  }

  sortRaids(a: RaidEvent, b: RaidEvent): number {
    if (a.start_datetime === b.start_datetime) return 0;
    if (a.start_datetime < b.start_datetime) return 1;
    return -1;
  }

}
