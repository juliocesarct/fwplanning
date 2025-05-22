import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionModel } from '../models/session.model';
import { TaskModel } from '../models/task.model';

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
    return addDoc(collection(this.firestore,'session'),{ taskData } );
  }

  getTasks(sessionId: string): Observable<TaskModel[]> {
    const itensRef = collection(this.firestore, 'tasks');
    const itensQuery = query(itensRef, where('sessionId', '==', sessionId));
    return collectionData(itensQuery, { idField: 'id' }) as Observable<TaskModel[]>;
  }

}
