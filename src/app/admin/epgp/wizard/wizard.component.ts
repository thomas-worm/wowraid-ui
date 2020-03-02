import { Component, OnInit } from '@angular/core';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { Character } from 'src/app/model/character.model';
import { Item } from 'src/app/model/item.model';
import { EpGp } from 'src/app/model/epgp.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/config.service';
import { formatDate } from '@angular/common';
import { CREATED } from 'http-status-codes';

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
      characters: [],
      early_bonus: 10,
      time_bonus: 15,
      time_bonus_minutes: 30,
      all_bonus: 10,
      all_bonus_datetime: Date.now
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
    this.basicsCharacters = characterList.sort((a, b) => (a.name.localeCompare(b.name)));
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

  generateTransactions() {
    let transactionsArray = this.transactionsForm.get('transactions') as FormArray;
    let preparedTransactionsArray: FormGroup[] = [];
    console.log('Werte Grundlagen aus...');
    let basics = this.basicsForm.value;
    console.log(basics);
    let raids = this.events.filter(e => basics.events.includes(e.key));
    let characters = this.characters.filter(c => basics.characters.filter(bc => bc[1] == c.name && bc[0] == c.realm).length > 0);
    characters.forEach(character => {
      console.log('Generiere Buchungen für ' + character.name + ' (' + character.realm + ')...');
      console.log(character);
      let epgp = this.epgp.find(e => e.characters.find(c => c.name == character.name && c.realm == character.realm));
      if (epgp) {
        let ep_acc = this.accounts.find(ac => ac.key == epgp.effort_points_account);
        let gp_acc = this.accounts.find(ac => ac.key == epgp.gear_points_account);
        console.log(epgp);
        let attendee_factor: number = 1.0;
        raids.forEach(raid => {
          console.log('Raid ' + raid.key + '...');
          console.log(raid);
          let attendees = raid.attendees.filter(a =>
            a.character_name == character.name
            && a.character_realm == character.realm
          );
          let early_attendee = attendees.find(a => a.start_datetime == raid.start_datetime);
          if (early_attendee) {
            console.log('Pünktliche Teilnahme am Raid gefunden.');
            if (basics.early_bonus > 0) {
              console.log('Pünktliche Teilnahme wird vergütet...');
              let earlyTransaction = this.formBuilder.group({
                account: [ ep_acc ] ,
                title: [ 'Bonus: Pünktliche Anwesenheit zum Raid' ],
                value: [ basics.early_bonus ],
                date_time: [ raid.start_datetime ],
                events: [ [ raid ] as RaidEvent[] ],
                characters: [ [ character ] as Character[] ],
                items: [ [] as Item[] ]
              });
              console.log(earlyTransaction);
              preparedTransactionsArray.push(earlyTransaction);
            }
          }
          if (basics.time_bonus_minutes > 0 && basics.time_bonus > 0) {
            console.log('Zeit wird vergütet...');
            var bonusBeginTime = raid.start_datetime;
            console.log(bonusBeginTime);
            var bonusEndTime = <Date><any>formatDate(this.addMinutes(bonusBeginTime, basics.time_bonus_minutes), 'yyyy-MM-ddTHH:mm:ss' , 'de');
            console.log(bonusEndTime);
            while (bonusEndTime <= raid.finish_datetime) {
              if (attendees.find(a => a.start_datetime <= bonusBeginTime && a.finish_datetime >= bonusEndTime)) {
                let startHourMinutes = formatDate(bonusBeginTime, 'HH:mm \'Uhr\'', 'de');
                let endHourMinutes = formatDate(bonusEndTime, 'HH:mm \'Uhr\'', 'de');
                console.log('Bonus für Teilnahme von ' + startHourMinutes + ' bis ' + endHourMinutes + '...');
                let timeBonusTransaction = this.formBuilder.group({
                  account: [ ep_acc ] ,
                  title: [ 'Raidteilnahme: ' + startHourMinutes + ' bis ' + endHourMinutes ],
                  value: [ basics.time_bonus ],
                  date_time: [ bonusEndTime ],
                  events: [ [ raid ] as RaidEvent[] ],
                  characters: [ [ character ] as Character[] ],
                  items: [ [] as Item[] ]
                });
                preparedTransactionsArray.push(timeBonusTransaction);
              }
              bonusBeginTime = bonusEndTime;
              bonusEndTime = <Date><any>formatDate(this.addMinutes(bonusBeginTime, basics.time_bonus_minutes), 'yyyy-MM-ddTHH:mm:ss' , 'de');
            }
          }
          let attendeeTime = attendees.map(a => new Date(a.finish_datetime).getTime() - new Date(a.start_datetime).getTime()).reduce((agg, x) => agg = agg + x, 0.0);
          let raidTime = new Date(raid.finish_datetime).getTime() - new Date(raid.start_datetime).getTime();
          attendee_factor = (attendeeTime / raidTime) * attendee_factor;
          console.log('Teilnahmefaktor für diesem Raid: ' + attendee_factor);
          console.log('Ermittle Bosse...');
          let bosses = this.getBosses(raid);
          bosses.forEach(boss => {
            if (boss.attendees.find(a => a.character_realm == character.realm && a.character_name == character.name)) {
              console.log('Vergüte Boss ' + boss.name + '...');
              let bossTransaction = this.formBuilder.group({
                account: [ ep_acc ] ,
                title: [ 'Boss-Kill: ' + boss.name ],
                value: [
                  ( boss.name.toLocaleLowerCase() == 'nefarian'
                  ) ?
                  20.0 :
                  (
                    (boss.name.toLocaleLowerCase() == 'chromaggus'
                    ) ?
                    15.0 :
                    (
                      (boss.name.toLocaleLowerCase() == 'ragnaros'
                      || boss.name.toLocaleLowerCase() == 'onyxia'
                      || boss.name.toLocaleLowerCase() == 'razorgore, der ungezähmte'
                      || boss.name.toLocaleLowerCase() == 'vaelastrasz, der verdorbene'
                      || boss.name.toLocaleLowerCase() == 'brutwächter dreschbringer'
                      || boss.name.toLocaleLowerCase() == 'feuerschwinge'
                      || boss.name.toLocaleLowerCase() == 'schattenschwinge'
                      || boss.name.toLocaleLowerCase() == 'flammenmaul'
                      ) ?
                      10.0 :
                      5.0
                    )
                  )
                ],
                date_time: [ boss.finish_datetime ],
                events: [ [ boss ] as RaidEvent[] ],
                characters: [ [ character ] as Character[] ],
                items: [ [] as Item[] ]
              });
              preparedTransactionsArray.push(bossTransaction);
            }
          });
          console.log('Ermittle Loots...');
          let loots = this.getLoots(raid, character);
          console.log(loots);
          loots.forEach(loot => {
            let lootTransaction = this.formBuilder.group({
              account: [ gp_acc ] ,
              title: [ 'Item: ' + loot.item.name ],
              value: [
                (loot.event != null &&
                  (
                    loot.event.name.toLocaleLowerCase() == 'ragnaros'
                    || loot.event.name.toLocaleLowerCase() == 'onyxia'
                    || loot.event.name.toLocaleLowerCase() == 'razorgore, der ungezähmte'
                    || loot.event.name.toLocaleLowerCase() == 'vaelastrasz, der verdorbene'
                    || loot.event.name.toLocaleLowerCase() == 'brutwächter dreschbringer'
                    || loot.event.name.toLocaleLowerCase() == 'feuerschwinge'
                    || loot.event.name.toLocaleLowerCase() == 'schattenschwinge'
                    || loot.event.name.toLocaleLowerCase() == 'flammenmaul'
                    || loot.event.name.toLocaleLowerCase() == 'chromaggus'
                    || loot.event.name.toLocaleLowerCase() == 'nefarian'
                  )) ?
                10.0 :
                ( loot.item.name.toLocaleLowerCase() == 'rucksack aus onyxias haut'
                ) ?
                0.0 :
                5.0
              ],
              date_time: [ loot.event.finish_datetime ],
              events: [ [ loot.event ] as RaidEvent[] ],
              characters: [ [ character ] as Character[] ],
              items: [ [ loot.item ] as Item[] ]
            });
            preparedTransactionsArray.push(lootTransaction);
          });
        });
        if (basics.all_bonus > 0 && basics.all_bonus_datetime) {
          console.log('Teilnahme an allen Raids wird vergütet...');
          if (attendee_factor >= 0.5) {
            console.log('Überwiegende Anwesenheit war vorhanden, Punkte werden gutgeschrieben.');
            let allRaidBonusTransaction =  this.formBuilder.group({
              account: [ ep_acc ] ,
              title: [ 'Bonus: Teilnahme an allen Raidtagen der Woche' ],
              value: [ basics.all_bonus ],
              date_time: [ basics.all_bonus_datetime ],
              events: [ raids as RaidEvent[] ],
              characters: [ [ character ] as Character[] ],
              items: [ [] as Item[] ]
            });
            preparedTransactionsArray.push(allRaidBonusTransaction);
          } else {
            console.log('Insgesamt zu wenig anwesend für den Bonus.');
          }
        }
      } else {
        console.log('Kein Punktekonto gefunden.');
      }
    });
    preparedTransactionsArray.forEach(x => transactionsArray.push(x));
  }

  addMinutes(value: Date, minutes: number): Date {
    return new Date(new Date(value).getTime() + 60 * 1000 * minutes);
  }

  getBosses(raid: RaidEvent): RaidEvent[] {
    let childRaids = (raid != null && raid.childs != null) ? raid.childs : [];
    return childRaids.map(c => this.getBosses(c))
      .reduce(
        (agg, b) => agg.concat(b),
        (raid.categories != null && raid.categories.includes('boss')) ? [ raid ] : []
      );
  }
  getLoots(raid: RaidEvent, character: Character): {
    item: Item,
    event: RaidEvent
  }[] {
    let childs = (raid != null && raid.childs != null) ? raid.childs : [];
    let childLoots = childs.map(c => this.getLoots(c, character)).reduce((agg, ca) => agg.concat(ca), []);
    let loots = raid.drops
      .filter(d => d.looter_realm == character.realm && d.looter_name == character.name)
      .map(d => {
        return {
          item: this.items.find(i => i.blizzard_identifier == d.item_blizzard_identifier),
          event: raid
        };
      });
    return loots.concat(childLoots);
  }

  onSubmit() {
    let transactionsData = this.transactionsForm.value.transactions;
    console.log(transactionsData);
    let transactionDtos = transactionsData.map(transaction => {
      return {
        account_key: transaction.account.key,
        date_time: transaction.date_time,
        title: transaction.title,
        value: transaction.value,
        characters: transaction.characters,
        events: transaction.events.map(e => e.key),
        items: transaction.items.map(i => i.blizzard_identifier)
      }
    });
    console.log(transactionDtos);
    this.http.post(this.configService.APIURL + '/transactions', transactionDtos, {
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
