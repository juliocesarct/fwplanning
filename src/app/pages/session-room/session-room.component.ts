import { Component } from '@angular/core';

@Component({
  selector: 'app-session-room',
  standalone: false,

  templateUrl: './session-room.component.html',
  styleUrl: './session-room.component.css'
})
export class SessionRoomComponent {

  sessionUsers: Array<string> = ["Julio","Joao","Mario"]

  constructor(){}

}
