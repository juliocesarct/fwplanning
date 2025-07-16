import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule, PoStepperModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment'; // A configuração do Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { VotingRoomComponent } from './pages/voting-room/voting-room.component';
import { SessionTasksComponent } from './pages/session-tasks/session-tasks.component';
import { TaskComponent } from './pages/task/task.component';
import { VotingResultComponent } from './pages/voting-result/voting-result.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSessionComponent,
    VotingRoomComponent,
    VotingResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([]),
    SessionTasksComponent,
    TaskComponent,
    PoStepperModule,
  ],
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
