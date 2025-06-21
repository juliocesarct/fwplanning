export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  result: number;
  voters: number;
  voting: boolean;


  constructor(sessionId: string, taskId: string, description: string, createdAt: Date, updatedAt: Date, result: number, voters: number, voting: boolean) {
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

export class Task {
  id?: string;
  taskData?: TaskModel;

  constructor(id?: string, taskData?: TaskModel ){
    this.id = id;
    this.taskData = taskData;
  }
}


