import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() taskId: string = 'TaskId';
  @Input() description: string = 'Descripton';

  vote(){
    
  }

}
