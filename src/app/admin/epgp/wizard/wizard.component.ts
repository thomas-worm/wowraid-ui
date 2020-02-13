import { Component, OnInit } from '@angular/core';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { Character } from 'src/app/model/character.model';
import { Item } from 'src/app/model/item.model';
import { EpGp } from 'src/app/model/epgp.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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

  basicsRaids: RaidEvent[] = [];
  basicsCharacters: Character[] = [];

  events: RaidEvent[] = [];
  characters: Character[] = [];
  items: Item[] = [];
  epgp: EpGp[] = [];
  accounts: {
    key: string,
    description: string
  }[] = [];

  transactionsForm: FormGroup;
  basicsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildBasicsForm();
    this.buildForm();
  }

  private loadData() {
    this.accountsLoading = true;
    this.http.get<EpGp[]>(this.configService.APIURL + '/kpi/epgp', {withCredentials: true}).subscribe(result => {
      this.epgp = result;
      this.epgp.forEach(entry => {
        this.accounts.push({
          key: entry.effort_points_account,
          description: 'EP für ' + entry.battle_tag
        })
        this.accounts.push({
          key: entry.gear_points_account,
          description: 'GP für ' + entry.battle_tag
        })
      })
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

  private buildBasicsForm() {
    this.basicsForm = this.formBuilder.group({
      events: [],
      characters: []
    });
    this.basicsForm.controls.events.valueChanges.subscribe(value => this.updateBasicsCharacters(value));
  }

  private buildForm() {
    this.transactionsForm = this.formBuilder.group({
      transactions: this.formBuilder.array([])
    })
  }

  updateBasicsCharacters(value: string[]) {
    this.basicsForm.controls.characters.patchValue([]);
    let characterList: Character[] = [];
    this.events.filter(event => value.includes(event.key)).forEach(event => {
      event.attendees.forEach(attendee => {
        if (characterList.filter(e => e.name == attendee.character_name && e.realm == attendee.character_realm).length == 0) {
          characterList.push(this.characters.find(c => c.name == attendee.character_name && c.realm == attendee.character_realm));
        }
      })
    });
    this.basicsCharacters = characterList;
    this.basicsForm.controls.characters.patchValue(this.basicsCharacters);
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

  addTransaction() {
    let transactionForm = this.formBuilder.group({
      account: null,
      title: '',
      value: 0,
      date_time: Date.now,
      events: [],
      characters: [],
      items: []
    });
    (this.transactionsForm.get('transactions') as FormArray).push(transactionForm);
  }

  removeTransaction(index: number) {
    (this.transactionsForm.get('transactions') as FormArray).removeAt(index);
  }

  filterAndSortRaids(events: RaidEvent[]): RaidEvent[] {
    return this.filterByEventcategory(events, 'raid').sort((a, b) => {
      if (a.start_datetime < b.start_datetime) {
        return -1
      } else if (a.start_datetime > b.start_datetime) {
        return 1
      } else {
        return 0
      }
    });
  }

  filterByEventcategory(events: RaidEvent[], category: string): RaidEvent[] {
    return events.filter(event => event.categories != null && event.categories.includes(category));
  }

}
