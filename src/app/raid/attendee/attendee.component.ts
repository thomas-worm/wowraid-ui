import { Component, OnInit, Input } from '@angular/core';
import { EventAttendee } from 'src/app/model/eventattendee.model';

@Component({
  selector: 'raid-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss']
})
export class RaidAttendeeComponent implements OnInit {

  @Input('attendee') attendee: EventAttendee;

  constructor() { }

  ngOnInit() {
  }

}
