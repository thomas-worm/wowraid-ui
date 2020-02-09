import { Component } from '@angular/core';
import { AuthService } from './auth.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'wowraid-ui';
  authenticated: boolean = false;
  username: string;
  groups: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    $.fn.tooltip.Constructor.DEFAULTS.whiteList['dl'] = [];
    $.fn.tooltip.Constructor.DEFAULTS.whiteList['dt'] = [];
    $.fn.tooltip.Constructor.DEFAULTS.whiteList['dd'] = [];
    this.authService.isAuthenticated().subscribe(
      result => {
        this.authenticated = result;
      }
    )
    this.authService.getUser().subscribe(
      user => {
        this.username = user.battleTag;
        this.groups = user.groups;
      }
    )
  }

}
