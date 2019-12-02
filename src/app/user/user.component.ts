import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user.battleTag;
      }
    )
  }

}
