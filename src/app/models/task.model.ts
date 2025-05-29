export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;
  result: number;
  voters: number;
  refined: boolean;


  constructor(sessionId: string, taskId: string, description: string, createdAt: Date, result: number, voters: number, refined: boolean) {
    this.sessionId = sessionId;
    this.taskId = taskId;
    this.description = description;
    this.createdAt = createdAt;
    this.result = result;
    this.voters = voters;
    this.refined = true;

  }
}

export class Tasks {
  id: string;
  taskData: TaskModel;

  constructor(id: string,taskData: TaskModel ){
    this.id = id;
    this.taskData = taskData;
  }
}


