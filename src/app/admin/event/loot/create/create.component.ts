import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/model/character.model';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { Item } from 'src/app/model/item.model';
import { Creature } from 'src/app/model/creature.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConfigService } from 'src/app/config.service';
import { HttpClient } from '@angular/common/http';
import { CREATED } from 'http-status-codes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class EventLootCreateAdminComponent implements OnInit {

  lootForm: FormGroup = new FormGroup({
    creature: new FormControl(),
    item: new FormControl(),
    character: new FormControl(),
    event: new FormControl()
  });

  events: RaidEvent[];
  characters: Character[];
  items: Item[];
  creatures: Creature[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.http.get<RaidEvent[]>(this.configService.APIURL + '/event', {withCredentials: true}).subscribe(events => this.events = events.sort(this.sortEvents));
    this.http.get<Item[]>(this.configService.APIURL + '/item', {withCredentials: true}).subscribe(items => this.items = items.sort(this.sortItems));
    this.http.get<Creature[]>(this.configService.APIURL + '/creature', {withCredentials: true}).subscribe(creatures => this.creatures = creatures.sort(this.sortCreatures));
    this.http.get<any[]>(this.configService.APIURL + '/character', {withCredentials: true}).subscribe(rawCharacters => {
      this.characters =
        rawCharacters.map(rawCharacter => new Character(
          rawCharacter.name,
          rawCharacter.realm,
          rawCharacter['class'],
          rawCharacter.race,
          rawCharacter.faction
        )).sort(this.sortCharacters);
    });
  }

  sortEvents(a: RaidEvent, b: RaidEvent): number {
    return a.key.localeCompare(b.key);
  }

  sortItems(a: Item, b: Item): number {
    return a.name.localeCompare(b.name);
  }

  sortCreatures(a: Creature, b: Creature): number {
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

  onSubmit() {
    console.log(this.lootForm.value);
    let form = this.lootForm.value;
    let characterinfo: string[] = (form.character == '' || form.character == ',') ? [null, null] : form.character.split(',');
    console.log({
      item_blizzard_identifier: <number> form.item,
      creature_blizzard_identifier: <number> (form.creature == '' ? null : form.creature),
      character_realm: <string> characterinfo[0],
      character_name: <string> characterinfo[1],
      event_key: <string> (form.event == '' ? null : form.event)
    });
    this.http.post(this.configService.APIURL + '/loot', {
      observe: 'response',
      withCredentials: true
    }).subscribe(response => {
      if (response.status == CREATED) {
        alert('Success');
      } else {
        alert('Es ist ein Fehler aufgetreten. Wende dich an die Raidleitung.');
      }
    });
  }

}
