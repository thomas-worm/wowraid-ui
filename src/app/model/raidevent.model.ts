export class RaidEvent {
  constructor(
    public key: string,
    public name: string,
    public description: string,
    public start_datetime: Date,
    public finish_datetime: Date,
    public categories: string[],
    public childs: RaidEvent[]
  ) {}
}
