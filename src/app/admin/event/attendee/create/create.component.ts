import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/model/character.model';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { EventAttendee } from 'src/app/model/eventattendee.model';
import { CREATED } from 'http-status-codes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class EventAttendeeAdminCreateComponent implements OnInit {

  attendeeForm: FormGroup = new FormGroup({
    event: new FormControl(),
    recursive: new FormControl(),
    character: new FormControl(),
    start_date_time: new FormControl(),
    finish_date_time: new FormControl(),
    roles: new FormControl(),
  });

  events: RaidEvent[];
  characters: Character[];
  roles: string[] = ['tank', 'heal', 'melee', 'ranged'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<RaidEvent[]>('https://wowraid-api.herokuapp.com/event', {withCredentials: true}).subscribe(events => this.events = events.sort(this.sortEvents));
    this.http.get<any[]>('https://wowraid-api.herokuapp.com/character', {withCredentials: true}).subscribe(rawCharacters => {
      this.characters =
        rawCharacters.map(rawCharacter => new Character(
          rawCharacter.name,
          rawCharacter.realm,
          rawCharacter['class'],
          rawCharacter.race,
          rawCharacter.faction
        )).sort(this.sortCharacters);
    });
    this.attendeeForm.controls.event.valueChanges.subscribe(value => this.suggestDateTimes(value, this.attendeeForm));
  }

  sortEvents(a: RaidEvent, b: RaidEvent): number {
    return a.key.localeCompare(b.key);
  }

  sortCharacters(a: Character, b: Character): number {
    let cmp: number = a.name.localeCompare(b.name);
    if (cmp == 0) {
      return a.realm.localeCompare(b.realm);
    } else {
      return cmp;
    }
  }

  suggestDateTimes(key: string, form: FormGroup) {
    if (key) {
      let event: RaidEvent = this.events.find(event => event.key == key);
      if (event) {
        if (!form.controls.start_date_time.value) {
          form.controls.start_date_time.setValue(event.start_datetime);
        }
        if (!form.controls.finish_date_time.value) {
          form.controls.finish_date_time.setValue(event.finish_datetime);
        }
      }
    }
  }

  onSubmit() {
    console.log(this.attendeeForm.value);
    let form = this.attendeeForm.value;
    let characterinfo: string[] = form.character.split(',');
    let attendee: EventAttendee = new EventAttendee(
      characterinfo[1],
      characterinfo[0],
      null,
      null,
      null,
      (form.roles) ? form.roles : [],
      form.start_date_time,
      form.finish_date_time
    );
    console.log(attendee);
    let recursive: boolean = (form.recursive != null && form.recursive);
    console.log(recursive);
    this.http.post('https://wowraid-api.herokuapp.com/event/' + this.attendeeForm.controls.event.value + '/attendee' + (recursive ? '?recursive=true' : ''), attendee, {
      observe:'response',
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
