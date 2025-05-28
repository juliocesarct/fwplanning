export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;
  result: number;
  voters: number;
  id: string | null;

  constructor(id:string, sessionId: string, taskId: string, description: string, createdAt: Date, result: number, voters: number) {
    this.sessionId = sessionId;
    this.taskId = taskId;
    this.description = description;
    this.createdAt = createdAt;
    this.result = result;
    this.voters = voters;
    this.id = id;
  }
}
