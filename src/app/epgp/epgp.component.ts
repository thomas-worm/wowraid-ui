import { Component, OnInit } from '@angular/core';
import { EpGp } from '../model/epgp.model';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../config.service';

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
    this.http.get<EpGp[]>(APIURL + '/kpi/epgp', {withCredentials: true}).subscribe(result => {
      this.epgp = result;
      this.loading = false;
    });
  }

}
