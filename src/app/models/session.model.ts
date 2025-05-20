export class SessionModel {
  name: string;
  creator: string;
  createdAt: Date;

  constructor(name: string, creator: string, createdAt: Date) {
    this.name = name;
    this.creator = creator;
    this.createdAt = createdAt;
  }
}
