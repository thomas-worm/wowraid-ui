export class EventDrop {
  constructor(
    public looter_name: string,
    public looter_realm: string,
    public looter_faction: string,
    public looter_race: string,
    public looter_class: string,
    public item_blizzard_identifier: number,
    public item_name: string,
  ) {}
}
