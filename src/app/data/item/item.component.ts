import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemDataComponent implements OnInit {

  @Input('blizzard-identifier') blizzard_identifier: number;
  @Input('name') name: string;

  constructor() { }

  ngOnInit() {
  }

}
