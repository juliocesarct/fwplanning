import { Component } from '@angular/core';

@Component({
  selector: 'app-session-tasks',
  standalone: false,

  templateUrl: './session-tasks.component.html',
  styleUrl: './session-tasks.component.css'
})
export class SessionTasksComponent {

  readonly userName = sessionStorage.getItem("user")
  readonly sessionName =  sessionStorage.getItem("sessionName")

}
