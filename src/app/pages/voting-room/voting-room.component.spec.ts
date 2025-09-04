import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingRoomComponent } from './voting-room.component';
import { environment } from '../../../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('VotingRoomComponent', () => {
  let component: VotingRoomComponent;
  let fixture: ComponentFixture<VotingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[VotingRoomComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())],

    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
