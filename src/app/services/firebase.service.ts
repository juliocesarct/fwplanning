import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  // Método para adicionar uma nova sessão
  addSession(sessionData: { name: string, description: string, createAt: Date }): Promise<any> {
    return addDoc(collection(this.firestore,'sessions'),{ sessionData } );
  }

}
