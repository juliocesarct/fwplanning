import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-voting-result',
  standalone: false,

  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.css'
})
export class VotingResultComponent implements OnInit {

  public _task: Task | undefined;
  public readonly actions: Array<PoPageAction> = [{label: 'Sair', action: () => this.goToSession()}];
  public readonly userName: string = localStorage.getItem("user") ?? "";
  public readonly sessionName: string = localStorage.getItem("session") ?? "";

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ){}

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
