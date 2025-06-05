import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: false,

  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  @Input() taskId: string = 'TaskId';
  @Input() description: string = 'Descripton';
  @Input() showButton: boolean = false;

  sessionId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id');
  }

  plan(){
    this.router.navigate(['session-room/',this.sessionId])
  }

}
