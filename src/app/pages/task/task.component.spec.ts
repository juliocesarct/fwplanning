import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from './task.component';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { FirebaseService } from '../../services/firebase.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const mockActivatedRoute = {
    paramMap: of({ get: () => '123' }) // '123' é um ID de exemplo
  };

  // Create a mock service
  const mockFirebaseService = {
    getTasks: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TaskComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        // Forneça o mock do ActivatedRoute
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: FirebaseService, useValue: mockFirebaseService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
