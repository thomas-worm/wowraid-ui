export class EpGp {
  constructor(
    public battle_tag: string,
    public effort_points: number,
    public effort_points_account: string,
    public gear_points: number,
    public gear_points_account: string,
    public priority: number,
    public characters: {
      realm: string,
      name: string
    }[]
  ) {}
}
