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

  _transaction: EpGpTransaction;
  popoverContent: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set transaction(transaction: EpGpTransaction) {
    this._transaction = transaction;
    var popoverContent: string = '';
    popoverContent += '<dl class="row">';
    popoverContent += '<dt class="col">Titel:</dt><dd class="row">' + escape(this.transaction.title) + '</dd>';
    popoverContent += '<dt class="col">Zeitpunkt:</dt><dd class="row">' + escape(formatDate(this.transaction.date_time, 'dd.MM.yyyy, HH:mm \'Uhr\'', 'de')) + '</dd>';
    popoverContent += '<dt class="col">Wert:</dt><dd class="row">' + escape(this.transaction.value) + ' ' + escape(this.transaction.currency) + '</dd>';
    if (this.transaction.description != null && this.transaction.description.trim() != '') {
      popoverContent += '<dt class="col">Beschreibung:</dt><dd class="row">' + escape(this.transaction.description) + '</dd>';
    }
    if (this.transaction.events != null && this.transaction.events.length > 0) {
      popoverContent += '<dt class="col">Ereignisse:</dt><dd class="row"><';
      this.transaction.events.forEach(event => {
        popoverContent += '<li>' + escape(event.name) + '</li>';
      });
      popoverContent += '</dd>';
    }
    popoverContent += '</dl>';
    this.popoverContent = popoverContent;
  }

  get transaction(): EpGpTransaction { return this._transaction; }

}
