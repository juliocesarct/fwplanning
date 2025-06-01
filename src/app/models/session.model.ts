export class SessionModel {
  name: string;
  creator: string;
  createdAt: Date;
  id: string;

  constructor(name: string, creator: string, createdAt: Date,id:string) {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.createdAt = createdAt;
  }
}

export class Session {
  id: string;
  sessionData: SessionModel;

  constructor(id:string, sessionData: SessionModel){
    this.id = id;
    this.sessionData = sessionData;
  }
}
