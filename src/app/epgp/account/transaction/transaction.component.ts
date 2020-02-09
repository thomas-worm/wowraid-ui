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
    popoverContent += '<dl class="row">';
    popoverContent += '<dt class="col">Titel:</dt><dd class="col">' + _.escape(transaction.title) + '</dd>';
    popoverContent += '<dt class="col">Zeitpunkt:</dt><dd class="col">' + _.escape(formatDate(transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'en-US')) + '</dd>';
    popoverContent += '<dt class="col">Wert:</dt><dd class="col">' + _.escape(transaction.value) + ' ' + _.escape(transaction.currency) + '</dd>';
    if (transaction.description != null && transaction.description.trim() != '') {
      popoverContent += '<dt class="col">Beschreibung:</dt><dd class="col">' + _.escape(transaction.description) + '</dd>';
    }
    if (transaction.events != null && transaction.events.length > 0) {
      popoverContent += '<dt class="col">Ereignisse:</dt><dd class="col"><ul>';
      transaction.events.forEach(event => {
        popoverContent += '<li>' + _.escape(event.name) + '</li>';
      });
      popoverContent += '</ul></dd>';
    }
    popoverContent += '</dl>';
    return popoverContent;
  }

}
