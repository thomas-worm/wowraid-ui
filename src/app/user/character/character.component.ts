import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  realms: String[] = [];
  factions: String[] = [];

  character = new FormGroup({
    realm: new FormControl({value: null, disabled: true}),
    characterName: new FormControl({value: '', disabled: false}),
    faction: new FormControl({value: null, disabled: true}),
    race: new FormControl({value: null, disabled: true}),
    class: new FormControl({value: null, disabled: true})
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<String[]>('https://wowraid-api.herokuapp.com/realm', {withCredentials: true}).subscribe(realms => {
      this.realms = realms;
      this.character.get('realm').enable();
    });
    this.http.get<String[]>('https://wowraid-api.herokuapp.com/faction', {withCredentials: true}).subscribe(factions => {
      this.factions = factions;
      this.character.get('faction').enable();
    });
  }

}
