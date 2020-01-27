import { Component, OnInit, Input } from '@angular/core';
import { EventAttendee } from 'src/app/model/eventattendee.model';

@Component({
  selector: 'raid-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class RaidAttendeeListComponent implements OnInit {

  _attendees: EventAttendee[] = [];

  druids: EventAttendee[] = [];
  hunters: EventAttendee[] = [];
  mages: EventAttendee[] = [];
  paladins: EventAttendee[] = [];
  priests: EventAttendee[] = [];
  rogues: EventAttendee[] = [];
  shamans: EventAttendee[] = [];
  warlocks: EventAttendee[] = [];
  warriors: EventAttendee[] = [];
  unknownClass: EventAttendee[] = [];

  tanks: EventAttendee[] = [];
  melees: EventAttendee[] = [];
  rangeds: EventAttendee[] = [];
  healers: EventAttendee[] = [];
  unknownRole: EventAttendee[] = [];

  uuid: string;

  constructor() { }

  ngOnInit() {
    this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  @Input()
  set attendees(attendees: EventAttendee[]) {
    this._attendees = attendees;
    this.druids = this.filterClass(attendees, 'druid');
    this.hunters = this.filterClass(attendees, 'hunter');
    this.mages = this.filterClass(attendees, 'mage');
    this.paladins = this.filterClass(attendees, 'paladin');
    this.priests = this.filterClass(attendees, 'priest');
    this.rogues = this.filterClass(attendees, 'rogue');
    this.shamans = this.filterClass(attendees, 'shaman');
    this.warlocks = this.filterClass(attendees, 'warlock');
    this.warriors = this.filterClass(attendees, 'warrior');
    this.unknownClass = attendees.filter(attendee => attendee.character_class == null || attendee.character_class == '');

    this.tanks = this.filterRole(attendees, 'tank');
    this.melees = this.filterRole(attendees, 'melee');
    this.rangeds = this.filterRole(attendees, 'ranged');
    this.healers = this.filterRole(attendees, 'heal');
    this.unknownRole = attendees.filter(attendee => attendee.roles == null || attendee.roles.length == 0);
  }

  get attendees(): EventAttendee[] {
    return this._attendees;
  }

  private filterClass(attendees: EventAttendee[], characterClass: String): EventAttendee[] {
    return attendees.filter(attendee => attendee.character_class.toLowerCase() == characterClass.toLowerCase());
  }

  private filterRole(attendees: EventAttendee[], role: String): EventAttendee[] {
    return attendees.filter(attendee => attendee.roles.filter(roleEntry => roleEntry.toLowerCase() == role.toLowerCase()).length > 0);
  }

}
