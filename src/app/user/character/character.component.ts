import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character = new FormGroup({
    realm: new FormControl({value: null, disabled: true}),
    characterName: new FormControl({value: '', disabled: false}),
    faction: new FormControl({value: null, disabled: true}),
    race: new FormControl({value: null, disabled: true}),
    class: new FormControl({value: null, disabled: true})
  });

  constructor() { }

  ngOnInit() {
  }

}
