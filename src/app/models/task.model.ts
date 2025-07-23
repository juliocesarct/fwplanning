export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  result: number;
  voters: Voter[];
  voting: boolean;
  complete: boolean;


  constructor(sessionId: string, taskId: string, description: string, createdAt: Date, updatedAt: Date, result: number, voters: Voter[], voting: boolean, complete: boolean) {
    this.sessionId = sessionId;
    this.taskId = taskId;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.result = result;
    this.voters = voters;
    this.voting = false;
    this.complete = false;

  }
}

export class Voter{
  name: string;
  hasVoted: boolean;
  vote: number;
  size: string;

  constructor(name: string, hasVoted: boolean, vote: number, size: string){
    this.name = name;
    this.hasVoted = hasVoted;
    this.vote = vote;
    this.size = size;
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


