import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public readonly APIURL = 'https://api.razorfen-wow.eu';

  constructor() {
  }

}
