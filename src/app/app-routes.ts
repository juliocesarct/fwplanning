import { Routes } from '@angular/router';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { SessionTasksComponent } from './pages/session-tasks/session-tasks.component';
import { AuthGuard } from './auth.guard';
import { VotingRoomComponent } from './pages/voting-room/voting-room.component';
import { VotingResultComponent } from './pages/voting-result/voting-result.component';

export const appRoutes: Routes = [
  { path: '', component: CreateSessionComponent }, // Rota padrão
  { path: 'createsession', component: CreateSessionComponent },
  { path: 'joinsession/:sessionId', component: CreateSessionComponent },
  { path: 'session/:sessionId', component: SessionTasksComponent, canActivate: [ AuthGuard ] },
  { path: 'voting-room/:sessionId/:taskId', component: VotingRoomComponent, canActivate: [ AuthGuard ] },
  { path: 'voting-result/:sessionId/:taskId', component: VotingResultComponent, canActivate: [ AuthGuard ] }
];
