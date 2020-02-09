import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EpGpTransaction } from 'src/app/model/epgptransaction.model';
import { ConfigService } from 'src/app/config.service';
import { EpGpAccount } from 'src/app/model/epgpaccount.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class EpgpAccountComponent implements OnInit {

  account: EpGpAccount;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.loading = true;
      this.http.get<EpGpAccount>(this.configService.APIURL + '/account/' + p['key'], {withCredentials: true}).subscribe(result => {
        this.account = result;
        this.loading = false;
      });
    });
  }

}
