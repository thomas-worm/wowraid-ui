export class EventAttendee {
  constructor(
    public character_name: string,
    public character_realm: string,
    public character_faction: string,
    public character_race: string,
    public character_class: string,
    public roles: string,
    public start_datetime: Date,
    public finish_datetime: Date,
  ) {}
}
