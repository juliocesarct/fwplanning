import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voting-result',
  standalone: false,

  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.css'
})
export class VotingResultComponent implements OnInit {

  public task: Task | undefined;

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


}
