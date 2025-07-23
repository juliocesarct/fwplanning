export class SessionModel {
  name: string;
  creator: string;
  createdAt: Date;
  currentTask: string;


  constructor(name: string, creator: string, createdAt: Date) {
    this.name = name;
    this.creator = creator;
    this.createdAt = createdAt;
    this.currentTask = "";
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
