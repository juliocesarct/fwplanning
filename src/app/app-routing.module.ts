import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { SessionTasksComponent } from './pages/session-tasks/session-tasks.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: CreateSessionComponent }, // Rota padrão
  { path: 'createsession', component: CreateSessionComponent },
  { path: 'joinsession/:id', component: CreateSessionComponent },
  { path: 'session/:id', component: SessionTasksComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
