import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Character } from '../../model/character.model';
import { APIURL } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  private userCharacters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);

  constructor(private http: HttpClient) {
  }

  getUserCharacters(): Observable<Character[]> {
    this.http.get<any[]>(APIURL + '/user/character', {withCredentials: true}).subscribe(rawCharacters => {
      let characters: Character[] =
        rawCharacters.map(rawCharacter => new Character(
          rawCharacter.name,
          rawCharacter.realm,
          rawCharacter['class'],
          rawCharacter.race,
          rawCharacter.faction
        ));
      this.userCharacters.next(characters)
    });
    return this.userCharacters.asObservable();
  }

}
