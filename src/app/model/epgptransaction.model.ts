export class EpGpTransaction {
  constructor(
    public date_time: Date,
    public title: String,
    public value: number,
    public currency: String,
    public description: string,
    public events: {
      key: string,
      name: string
    }[],
    public characters: {
      realm: string,
      name: string
    }[],
    public items: {
      blizzard_identifier: string,
      name: string
    }[]
  ) {}
}
