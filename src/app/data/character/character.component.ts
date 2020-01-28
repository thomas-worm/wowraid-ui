import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterDataComponent implements OnInit {

  @Input('character-name') character_name: string;
  @Input('character-class') character_class: string;

  constructor() { }

  ngOnInit() {
  }

}
