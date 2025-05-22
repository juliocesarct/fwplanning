export class TaskModel {
  sessionId: string;
  taskId: string;
  description: string;
  createdAt: Date;

  constructor(sessionId: string, taskId: string, description: string, createdAt: Date) {
    this.sessionId = sessionId;
    this.taskId = taskId;
    this.description = description;
    this.createdAt = createdAt;
  }
}
