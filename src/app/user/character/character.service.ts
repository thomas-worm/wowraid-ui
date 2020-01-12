import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Character } from '../../model/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  private userCharacters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);

  constructor(private http: HttpClient) {
  }

  getUserCharacters(): Observable<Character[]> {
    this.http.get<Character[]>('https://wowraid-api.herokuapp.com/user/character', {withCredentials: true}).subscribe(characters => this.userCharacters.next(characters));
    return this.userCharacters.asObservable();
  }

}
