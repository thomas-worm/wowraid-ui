export class EpGpTransaction {
  constructor(
    public date_time: Date,
    public title: String,
    public value: number,
    public currency: String
  ) {}
}
