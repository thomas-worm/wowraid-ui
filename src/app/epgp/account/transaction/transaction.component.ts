import { Component, OnInit, Input } from '@angular/core';
import { EpGpTransaction } from 'src/app/model/epgptransaction.model';
import { escape } from 'node_modules/lodash/escape'
import { formatDate } from '@angular/common';

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
    var popoverContent: string = 'Test';
    popoverContent += '<dl class="row">';
    popoverContent += '<dt class="col">Titel:</dt><dd class="row">' + transaction.title + '</dd>';
    /**popoverContent += '<dt class="col">Zeitpunkt:</dt><dd class="row">' + escape(formatDate(transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'de')) + '</dd>';
    popoverContent += '<dt class="col">Wert:</dt><dd class="row">' + escape(transaction.value) + ' ' + escape(transaction.currency) + '</dd>';
    if (transaction.description != null && transaction.description.trim() != '') {
      popoverContent += '<dt class="col">Beschreibung:</dt><dd class="row">' + escape(transaction.description) + '</dd>';
    }
    if (transaction.events != null && transaction.events.length > 0) {
      popoverContent += '<dt class="col">Ereignisse:</dt><dd class="row"><';
      transaction.events.forEach(event => {
        popoverContent += '<li>' + escape(event.name) + '</li>';
      });
      popoverContent += '</dd>';
    }*/
    popoverContent += '</dl>';
    return popoverContent;
  }

  /** @Input()
  set transaction(transaction: EpGpTransaction) {
    this._transaction = transaction;
    var popoverContent: string = '';
    popoverContent += '<dl class="row">';
    popoverContent += '<dt class="col">Titel:</dt><dd class="row">' + escape(transaction.title) + '</dd>';
    popoverContent += '<dt class="col">Zeitpunkt:</dt><dd class="row">' + escape(formatDate(transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'de')) + '</dd>';
    popoverContent += '<dt class="col">Wert:</dt><dd class="row">' + escape(transaction.value) + ' ' + escape(transaction.currency) + '</dd>';
    if (transaction.description != null && transaction.description.trim() != '') {
      popoverContent += '<dt class="col">Beschreibung:</dt><dd class="row">' + escape(transaction.description) + '</dd>';
    }
    if (transaction.events != null && transaction.events.length > 0) {
      popoverContent += '<dt class="col">Ereignisse:</dt><dd class="row"><';
      transaction.events.forEach(event => {
        popoverContent += '<li>' + escape(event.name) + '</li>';
      });
      popoverContent += '</dd>';
    }
    popoverContent += '</dl>';
    this.popoverContent = popoverContent;
  }

  get transaction(): EpGpTransaction { return this._transaction; } **/

}
