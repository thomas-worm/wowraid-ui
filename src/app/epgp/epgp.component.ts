import { Component, OnInit } from '@angular/core';
import { EpGp } from '../model/epgp.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-epgp',
  templateUrl: './epgp.component.html',
  styleUrls: ['./epgp.component.scss']
})
export class EpgpComponent implements OnInit {

  epgp: EpGp[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<EpGp[]>('https://wowraid-api.herokuapp.com/kpi/epgp', {withCredentials: true}).subscribe(result => {
      this.epgp = result;
      this.loading = false;
    });
  }

}
