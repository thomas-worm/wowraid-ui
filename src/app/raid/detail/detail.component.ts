import { Component, OnInit } from '@angular/core';
import { RaidEvent } from '../../model/raidevent.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class RaidDetailComponent implements OnInit {

  private raid: RaidEvent;
  private loading: boolean = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.loading = true;
      this.http.get<RaidEvent>(this.configService.APIURL + '/event/' + p['key'], {withCredentials: true}).subscribe(result => {
        this.raid = result;
        this.loading = false;
      });
    });
  }

  filterInstances(event: RaidEvent): RaidEvent[] {
    return event.childs.filter(child => child.categories.includes('instance'));
  }

  filterBosses(event: RaidEvent): RaidEvent[] {
    return event.childs.filter(child => child.categories.includes('boss'));
  }

}
