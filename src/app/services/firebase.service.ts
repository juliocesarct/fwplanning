import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Session, SessionModel } from '../models/session.model';
import { TaskModel, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  // Método para adicionar uma nova sessão
  addSession(sessionData: SessionModel): Promise<any> {
    sessionData.createdAt = new Date();
    return addDoc(collection(this.firestore,'session'),{ sessionData } );
  }

  // Método para adicionar uma nova task
  addTask(taskData: TaskModel): Promise<any> {
    taskData.createdAt = new Date();
    taskData = Object.assign({}, taskData);
    return addDoc(collection(this.firestore,'tasks'),{ taskData } );
  }

  getSession(sessionId: string): Observable<Session> {
    const docRef = doc(this.firestore, 'session', sessionId);
    return docData(docRef, { idField: 'id' }) as Observable<Session>;
  }

  getTask(taskId: string): Observable<Task> {
    const docRef = doc(this.firestore, 'tasks', taskId);
    return docData(docRef, { idField: 'id' }) as Observable<Task>;
  }

  getTasks(sessionId: string): Observable<Task[]> {
    const itensRef = collection(this.firestore, 'tasks');
    const itensQuery = query(itensRef, where('taskData.sessionId', '==', sessionId));
    return collectionData(itensQuery, { idField: 'id' }) as Observable<Task[]>;
  }

   updateTask(task: Partial<Task>): Promise<void> {
    const taskDocRef = doc(this.firestore, 'tasks', task.id!);
    const voters = task.taskData!.voters.map((obj)=> {return Object.assign({}, obj)});
    task.taskData!.voters = voters;
    return updateDoc(taskDocRef, {'taskData': task.taskData!});
  }

  updateSession(sessionId: string, sessionData: Partial<SessionModel>): Promise<void> {
    const sessionDocRef = doc(this.firestore, 'session', sessionId);
    return updateDoc(sessionDocRef, sessionData);
  }

}
