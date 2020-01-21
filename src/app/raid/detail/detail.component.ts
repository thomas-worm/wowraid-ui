import { Component, OnInit } from '@angular/core';
import { RaidEvent } from '../../model/raidevent.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class RaidDetailComponent implements OnInit {

  private raid: RaidEvent;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.http.get<RaidEvent>('https://wowraid-api.herokuapp.com/event/' + p['key'], {withCredentials: true}).subscribe(result => this.raid = result);
    });
  }

}
