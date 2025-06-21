import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PoModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;
  @Input() showButton: boolean = false;

  sessionId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ){}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id');
  }

  plan(){

    this.task.taskData!.voting = true;
    this.task.taskData!.updatedAt = new Date();

    this.firebase.updateTask(this.task).then(
        (data) => {
          console.log('Task atualizada com sucesso!');
        }).catch(error => {
          console.error('Erro ao atualizar task: ', error);
        });

    this.router.navigate(['session-room/',this.sessionId])
  }

}
