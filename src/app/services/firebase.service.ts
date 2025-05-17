import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa o Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  // Método para adicionar uma nova sessão
  addSession(sessionData: { name: string, description: string }): Promise<any> {
    return this.firestore.collection('sessions').add(sessionData);
  }

  // Método para obter todas as sessões
  getSessions(): Observable<any[]> {
    return this.firestore.collection('sessions').valueChanges();
  }


}