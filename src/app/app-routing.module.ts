import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { SessionTasksComponent } from './pages/session-tasks/session-tasks.component';
import { AuthGuard } from './auth.guard';
import { VotingRoomComponent } from './pages/voting-room/voting-room.component';

const routes: Routes = [
  { path: '', component: CreateSessionComponent }, // Rota padrão
  { path: 'createsession', component: CreateSessionComponent },
  { path: 'joinsession/:sessionId', component: CreateSessionComponent },
  { path: 'session/:sessionId', component: SessionTasksComponent, canActivate: [ AuthGuard ] },
  { path: 'voting-room/:sessionId/:taskId', component: VotingRoomComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
