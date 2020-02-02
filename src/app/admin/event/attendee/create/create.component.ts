import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RaidEvent } from 'src/app/model/raidevent.model';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/model/character.model';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

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

  suggestDateTimes() {
    if (this.attendeeForm.controls.event.value) {
      let event: RaidEvent = this.events.find(event => event.key = this.attendeeForm.controls.event.value);
      if (event) {
        if (!this.attendeeForm.controls.start_date_time.value) {
          this.attendeeForm.controls.start_date_time.setValue(event.start_datetime);
        }
        if (!this.attendeeForm.controls.finish_date_time.value) {
          this.attendeeForm.controls.finish_date_time.setValue(event.finish_datetime);
        }
      }
    }
  }

  onSubmit() {
    console.log(this.attendeeForm.value);
  }

}
