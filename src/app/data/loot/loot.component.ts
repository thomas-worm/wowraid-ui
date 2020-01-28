import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.scss']
})
export class LootDataComponent implements OnInit {

  @Input('item-blizzard-identifier') item_blizzard_identifier: number;
  @Input('item-name') item_name: string;
  @Input('looter-name') looter_name: string;
  @Input('looter-class') looter_class: string;

  constructor() { }

  ngOnInit() {
  }

}
