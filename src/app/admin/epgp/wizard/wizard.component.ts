import { Component, OnInit } from '@angular/core';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { Character } from 'src/app/model/character.model';
import { Item } from 'src/app/model/item.model';
import { EpGp } from 'src/app/model/epgp.model';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class EpGpWizardAdminComponent implements OnInit {

  accountsLoading: boolean = false;
  charactersLoading: boolean = false;
  eventsLoading: boolean = false;
  itemsLoading: boolean = false;

  events: RaidEvent[] = [];
  characters: Character[] = [];
  items: Item[] = [];
  epgp: EpGp[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.accountsLoading = true;
    this.http.get<EpGp[]>(this.configService.APIURL + '/kpi/epgp', {withCredentials: true}).subscribe(result => {
      this.epgp = result;
      this.accountsLoading = false;
    });
    this.eventsLoading = true;
    this.http.get<RaidEvent[]>(this.configService.APIURL + '/event', {withCredentials: true}).subscribe(events => {
      this.events = events.sort(this.sortEvents)
      this.eventsLoading = false;
    });
    this.itemsLoading = true;
    this.http.get<Item[]>(this.configService.APIURL + '/item', {withCredentials: true}).subscribe(items => {
      this.items = items.sort(this.sortItems);
      this.itemsLoading = false;
    });
    this.charactersLoading = true;
    this.http.get<any[]>(this.configService.APIURL + '/character', {withCredentials: true}).subscribe(rawCharacters => {
      this.characters =
        rawCharacters.map(rawCharacter => new Character(
          rawCharacter.name,
          rawCharacter.realm,
          rawCharacter['class'],
          rawCharacter.race,
          rawCharacter.faction
        )).sort(this.sortCharacters);
        this.charactersLoading = false;
    });
  }

  sortEvents(a: RaidEvent, b: RaidEvent): number {
    return a.key.localeCompare(b.key);
  }

  sortItems(a: Item, b: Item): number {
    return a.name.localeCompare(b.name);
  }

  sortCharacters(a: Character, b: Character): number {
    let cmp: number = a.name.localeCompare(b.name);
    if (cmp == 0) {
      return a.realm.localeCompare(b.realm);
    } else {
      return cmp;
    }
  }

}
