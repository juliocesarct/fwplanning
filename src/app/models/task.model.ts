export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  result: number;
  voters: Array<Voter>;
  voting: boolean;


  constructor(sessionId: string, taskId: string, description: string, createdAt: Date, updatedAt: Date, result: number, voters: Array<Voter>, voting: boolean) {
    this.sessionId = sessionId;
    this.taskId = taskId;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.result = result;
    this.voters = voters;
    this.voting = false;

  }
}

export class Voter{
  name: string;
  hasVoted: boolean;
  vote: number;

  constructor(name: string, hasVoted: boolean, vote:number){
    this.name = name;
    this.hasVoted = hasVoted;
    this.vote = vote;
  }
}

export class Task {
  id?: string;
  taskData?: TaskModel;

  constructor(id?: string, taskData?: TaskModel ){
    this.id = id;
    this.taskData = taskData;
  }
}


