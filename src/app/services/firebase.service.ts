import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Session, SessionModel } from '../models/session.model';
import { TaskModel, Tasks } from '../models/task.model';

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

  getTasks(sessionId: string): Observable<Tasks[]> {
    const itensRef = collection(this.firestore, 'tasks');
    const itensQuery = query(itensRef, where('taskData.sessionId', '==', sessionId));
    return collectionData(itensQuery, { idField: 'id' }) as Observable<Tasks[]>;
  }

}
