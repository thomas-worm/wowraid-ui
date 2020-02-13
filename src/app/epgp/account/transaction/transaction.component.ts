import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { EpGpTransaction } from 'src/app/model/epgptransaction.model';
import { formatDate, formatNumber } from '@angular/common';
import _ from 'lodash';

declare var $: any;

@Component({
  selector: 'epgp-account-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class EpGpAccountTransactionComponent implements OnInit, AfterViewInit {

  @ViewChild('popover', {static: false}) popover: ElementRef;
  @Input() transaction: EpGpTransaction;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.popover.nativeElement).popover();
  }

  popoverContent(transaction: EpGpTransaction): string {
    var popoverContent: string = '';
    popoverContent += '<dl class="row">';
    popoverContent += '<dt class="col-3 text-nowrap">Titel:</dt><dd class="col-9">' + _.escape(transaction.title) + '</dd>';
    popoverContent += '<dt class="col-3 text-nowrap">Zeitpunkt:</dt><dd class="col-9">' + _.escape(formatDate(transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'de')) + '</dd>';
    popoverContent += '<dt class="col-3 text-nowrap">Wert:</dt><dd class="col-9">' + _.escape(formatNumber(transaction.value, 'de', '1.2-2')) + ' ' + _.escape(transaction.currency) + '</dd>';
    if (transaction.description != null && transaction.description.trim() != '') {
      popoverContent += '<dt class="col-3 text-nowrap">Beschreibung:</dt><dd class="col-9">' + _.escape(transaction.description) + '</dd>';
    }
    if (transaction.events != null && transaction.events.length > 0) {
      popoverContent += '<dt class="col-3 text-nowrap">Ereignisse:</dt><dd class="col-9"><ul class="row">';
      transaction.events.forEach(event => {
        popoverContent += '<li class="col-12">' + _.escape(event.name) + '</li>';
      });
      popoverContent += '</ul></dd>';
    }
    if (transaction.characters != null && transaction.characters.length > 0) {
      popoverContent += '<dt class="col-3 text-nowrap">Ereignisse:</dt><dd class="col-9"><ul class="row">';
      transaction.characters.forEach(character => {
        popoverContent += '<li class="col-12">' + _.escape(character.name) + ' (' + _.escape(character.realm) + ')</li>';
      });
      popoverContent += '</ul></dd>';
    }
    popoverContent += '</dl>';
    return popoverContent;
  }

}
