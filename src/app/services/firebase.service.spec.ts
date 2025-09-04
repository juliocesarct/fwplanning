import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { CreateSessionComponent } from '../pages/create-session/create-session.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('FirebaseService', () => {
  let service: FirebaseService;
  const mockAngularFirestore = {
    collection: () => ({
      doc: () => ({
        valueChanges: () => of(null),
        set: () => Promise.resolve(),
      }),
    }),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateSessionComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
      ],
      providers: [FirebaseService,
         { provide: AngularFirestore, useValue: mockAngularFirestore }
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
