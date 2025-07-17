import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-voting-result',
  standalone: false,

  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.css'
})
export class VotingResultComponent implements OnInit {

  public _task: Task | undefined;
  public readonly actions: Array<PoPageAction> = [{label: 'Sair', action: () => this.goToSession()}];

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
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

  goToSession(){
    if(!this._task?.taskData?.voting){
      this.router.navigate(['/session', this.route.snapshot.paramMap.get('sessionId') ]);
    }
  }


}
