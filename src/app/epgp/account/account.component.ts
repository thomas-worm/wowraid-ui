import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EpGpTransaction } from 'src/app/model/epgptransaction.model';
import { APIURL } from 'src/app/config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class EpgpAccountComponent implements OnInit {

  transactions: EpGpTransaction[] = [];
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.loading = true;
      this.http.get<EpGpTransaction[]>(APIURL + '/account/' + p['key'] + '/transaction', {withCredentials: true}).subscribe(result => {
        this.transactions = result;
        this.loading = false;
      });
    });
  }

}
