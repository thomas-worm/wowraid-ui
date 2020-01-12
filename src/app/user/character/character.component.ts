import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../model/character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characters: Observable<Character[]>;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characters = this.characterService.getUserCharacters();
  }

}
