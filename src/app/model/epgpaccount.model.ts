import { EpGpTransaction } from './epgptransaction.model';

export class EpGpAccount {
  constructor(
    public name: string,
    public transactions: EpGpTransaction[]
  ) {}
}
