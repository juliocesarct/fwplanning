import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModule, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [PoModule, CommonModule, TaskComponent],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.css'
})
export class VotingResultComponent implements OnInit {

  public _task: Task | undefined;
  public readonly actions: PoPageAction[] = [{label: 'Sair', action: () => this.goToSession()}];
  public readonly userName: string = localStorage.getItem("user") ?? "";
  public readonly sessionName: string = localStorage.getItem("session") ?? "";

  private firebase = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  ngOnInit(){
    if(this.route.snapshot.paramMap.get('taskId')){
      this.firebase.getTask(this.route.snapshot.paramMap.get('taskId')!).subscribe(
        data => {
          this.task = data
        },
        error => console.log(error)
      )
    }
  }

  set task(value: Task | undefined){
    this._task = value;
  }

  get task(): Task | undefined{
    return this._task
  }

  voteAgain(){
    this.router.navigate(['voting-room/',this.route.snapshot.paramMap.get('sessionId'), this.route.snapshot.paramMap.get('taskId')])
  }

  goToSession(){
    if(this._task?.taskData?.complete){
      this.router.navigate(['/session', this.route.snapshot.paramMap.get('sessionId') ]);
    }else{
      this.poNotification.warning('Aguarde a conclusão')
    }
  }


}
