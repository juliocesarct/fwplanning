import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionModel } from '../models/session.model';

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

}
