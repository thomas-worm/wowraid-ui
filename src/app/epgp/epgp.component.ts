import { Component, OnInit } from '@angular/core';
import { EpGp } from '../model/epgp.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-epgp',
  templateUrl: './epgp.component.html',
  styleUrls: ['./epgp.component.scss']
})
export class EpgpComponent implements OnInit {

  epgp: EpGp[] = [];
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<EpGp[]>(this.configService.APIURL + '/kpi/epgp', {withCredentials: true}).subscribe(result => {
      this.epgp = result;
      this.loading = false;
    });
  }

  sortCharacters(characters: any[]): any {
    return characters.sort((char1: any, char2: any) => (<string> char1.name).localeCompare(<string> char2.name));
  }

}
