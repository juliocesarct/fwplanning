import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTasksComponent } from './session-tasks.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('SessionTasksComponent', () => {
  let component: SessionTasksComponent;
  let fixture: ComponentFixture<SessionTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SessionTasksComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
      ]
    }) 
    .compileComponents();

    fixture = TestBed.createComponent(SessionTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
