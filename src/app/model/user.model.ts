export class User {
  constructor(
    public userIdentifier: number,
    public battleTag: string,
    public authenticated: boolean
  ) {}
}
