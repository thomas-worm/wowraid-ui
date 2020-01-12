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

  characters: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getUserCharacters().subscribe(
      characters => this.characters = characters
    );
  }

}
