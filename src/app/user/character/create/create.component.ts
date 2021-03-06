import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OK, CREATED, SEE_OTHER } from 'http-status-codes';
import { Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  realms: string[] = [];
  realmsLoading: boolean = false;
  factions: string[] = [];
  factionsLoading: boolean = false;
  races: string[] = [];
  racesLoading: boolean = false;
  classes: string[] = [];
  classesLoading: boolean = false;

  character = new FormGroup({
    realm: new FormControl({value: null, disabled: true}, Validators.required),
    name: new FormControl({value: '', disabled: false}, Validators.required),
    faction: new FormControl({value: null, disabled: true}, Validators.required),
    race: new FormControl({value: null, disabled: true}, Validators.required),
    class: new FormControl({value: null, disabled: true}, Validators.required)
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private characterService: CharacterService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.realmsLoading = true;
    this.http.get<string[]>(this.configService.APIURL + '/realm', {withCredentials: true}).subscribe(realms => {
      this.realms = realms;
      this.character.controls.realm.enable();
      this.realmsLoading = false;
    });
    this.factionsLoading = true;
    this.http.get<string[]>(this.configService.APIURL + '/faction', {withCredentials: true}).subscribe(factions => {
      this.factions = factions;
      this.character.controls.faction.enable();
      this.factionsLoading = false;
    });
    this.character.controls.faction.valueChanges.subscribe(value => this.onFactionChange(value, this.character));
    this.character.controls.race.valueChanges.subscribe(value => this.onRaceChange(value, this.character));
  }

  translateFaction(faction: string): string {
    if (faction.toLocaleLowerCase() == 'alliance') {
      return 'Allianz';
    }
    if (faction.toLocaleLowerCase() == 'horde') {
      return 'Horde';
    }
    return faction;
  }

  onFactionChange(value: string, form: FormGroup) {
    form.controls.race.patchValue(null);
    form.controls.race.disable();
    if (value != null) {
      this.racesLoading = true;
      this.http.get<string[]>(this.configService.APIURL + '/faction/' + value.toLocaleLowerCase() + '/race', {withCredentials: true}).subscribe(races => {
        this.races = races;
        form.controls.race.enable();
        this.racesLoading = false;
      });
    }
  }

  translateRace(race: string): string {
    if (race.toLocaleLowerCase() == 'human') {
      return 'Mensch';
    }
    if (race.toLocaleLowerCase() == 'dwarf') {
      return 'Zwerg';
    }
    if (race.toLocaleLowerCase() == 'night elf'
     || race.toLocaleLowerCase() == 'nightelf') {
      return 'Nachtelf';
    }
    if (race.toLocaleLowerCase() == 'gnome') {
      return 'Gnom';
    }
    if (race.toLocaleLowerCase() == 'orc') {
      return 'Orc';
    }
    if (race.toLocaleLowerCase() == 'undead') {
      return 'Untoter';
    }
    if (race.toLocaleLowerCase() == 'tauren') {
      return 'Taure';
    }
    if (race.toLocaleLowerCase() == 'troll') {
      return 'Troll';
    }
    return race;
  }

  onRaceChange(value: string, form: FormGroup) {
    form.controls.class.patchValue(null);
    form.controls.class.disable();
    if (value != null) {
      this.classesLoading = true;
      this.http.get<string[]>(this.configService.APIURL + '/race/' + value.toLocaleLowerCase() + '/class', {withCredentials: true}).subscribe(classes => {
        this.classes = classes;
        form.controls.class.enable();
        this.classesLoading = false;
      });
    }
  }

  translateClass(className: string): string {
    if (className.toLocaleLowerCase() == 'priest') {
      return 'Priester';
    }
    if (className.toLocaleLowerCase() == 'rogue') {
      return 'Schurke';
    }
    if (className.toLocaleLowerCase() == 'warrior') {
      return 'Krieger';
    }
    if (className.toLocaleLowerCase() == 'mage') {
      return 'Magier';
    }
    if (className.toLocaleLowerCase() == 'druid') {
      return 'Druide';
    }
    if (className.toLocaleLowerCase() == 'hunter') {
      return 'Jäger';
    }
    if (className.toLocaleLowerCase() == 'warlock') {
      return 'Hexenmeister';
    }
    if (className.toLocaleLowerCase() == 'shaman') {
      return 'Schamane';
    }
    if (className.toLocaleLowerCase() == 'paladin') {
      return 'Paladin';
    }
    return className;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.http.post(this.configService.APIURL + '/user/character', this.character.value, {
      observe:'response',
      withCredentials: true
    }).subscribe(response => {
      if (response.status == CREATED) {
        this.characterService.getUserCharacters();
        this.router.navigate(['/user/characters']);
      } else if (response.status == SEE_OTHER || response.status == OK) {
        alert('Der Charakter wurde bereits von jemand angelegt!');
      } else {
        alert('Es ist ein Fehler aufgetreten. Wende dich an die Raidleitung.');
      }
    });
  }

}
