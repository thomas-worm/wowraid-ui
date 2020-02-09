import { Component, OnInit, Input } from '@angular/core';
import { EpGpTransaction } from 'src/app/model/epgptransaction.model';
import { formatDate } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'epgp-account-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class EpGpAccountTransactionComponent implements OnInit {

  @Input() transaction: EpGpTransaction;

  constructor() { }

  ngOnInit() {
  }

  popoverContent(transaction: EpGpTransaction): string {
    var popoverContent: string = '';
    popoverContent += '<div class="row dl">';
    popoverContent += '<div class="col dt">Titel:</div><div class="col dd">' + _.escape(transaction.title) + '</div>';
    popoverContent += '<div class="col dt">Zeitpunkt:</div><div class="col dd">' + _.escape(formatDate(transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'en-US')) + '</div>';
    popoverContent += '<div class="col dt">Wert:</div><div class="col dd">' + _.escape(transaction.value) + ' ' + _.escape(transaction.currency) + '</div>';
    if (transaction.description != null && transaction.description.trim() != '') {
      popoverContent += '<div class="col dt">Beschreibung:</div><div class="col dd">' + _.escape(transaction.description) + '</div>';
    }
    if (transaction.events != null && transaction.events.length > 0) {
      popoverContent += '<div class="col dt">Ereignisse:</div><div class="col dd"><ul class="row">';
      transaction.events.forEach(event => {
        popoverContent += '<li>' + _.escape(event.name) + '</li>';
      });
      popoverContent += '</ul></div>';
    }
    popoverContent += '</div>';
    return popoverContent;
  }

}
