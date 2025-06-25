import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Voter } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { PoInfoOrientation, PoModule, PoTagOrientation } from '@po-ui/ng-components';
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
  @Input() isCreator: boolean = false;

  sessionId: string | null = null;
  isInVotingRoom: boolean = false;
  resultSize: string | undefined;
  taskTag: any;
  orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;

  get totalParticipantes(): string {
    const voters = this.task?.taskData?.voters;
    if (!Array.isArray(voters)) {
      return '0';
    }
    return voters.filter(voter => voter.hasVoted).length.toString();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ){}

  ngOnInit(): void {
    var numberOfVotes = 0;
    var voteSum = 0;

    if( this.task.taskData!.voting ) {
      this.taskTag = {value: 'Em andamento', type: 'warning'}
    } else {
      this.taskTag = this.task.taskData!.result ? {value: 'Finalizado', type: 'success'} : {value: 'Pendente', type: 'danger'}
    }
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.isInVotingRoom = this.route.snapshot.url[0].path === "voting-room";
    this.task.taskData!.voters .forEach(voter => {
      if(voter.hasVoted && voter.vote > 0){
        numberOfVotes++
        voteSum += voter.vote;
      }
    });
    const result = Math.round(voteSum / numberOfVotes);

    if(result <= 1){
      this.resultSize = "P"
    }else if(result == 2){
      this.resultSize = "M"
    }else if(result >= 3){
      this.resultSize = "G"
    }

    this.task.taskData!.result = result;

  }

  plan(){

    localStorage.setItem('voting','true')
    this.task.taskData!.voting = true;
    this.task.taskData!.updatedAt = new Date();

    this.firebase.updateTask(this.task).then(
        () => {
          console.log('Task atualizada com sucesso!');
        }).catch(error => {
          console.error('Erro ao atualizar task: ', error);
        });

    //this.router.navigate(['voting-room/',this.sessionId, this.task.id])
  }

  vote(){

    const voter: Voter = new Voter(localStorage.getItem('user')!,false,0);
    const canPushVoter = !this.task.taskData!.voters.some(
      (existingVoter) => existingVoter.name === voter.name
    );

    if(canPushVoter){
      this.task.taskData!.updatedAt = new Date();
      this.task.taskData!.voters.push(voter)

      this.firebase.updateTask(this.task).then(
        (data) => {
          console.log('Task atualizada com sucesso!'+data);
        }).catch(error => {
          console.error('Erro ao atualizar task: ', error);
        });
    }

    this.router.navigate(['voting-room/',this.sessionId, this.task.id])
  }

  complete(){
    localStorage.setItem('voting','false');
    this.task.taskData!.updatedAt = new Date();
    this.task.taskData!.voting = false;

    this.firebase.updateTask(this.task).then(
      () => {
        console.log('Task atualizada com sucesso!');
        this.router.navigate(['session/',this.sessionId])
      }).catch(error => {
        console.error('Erro ao atualizar task: ', error);
      });
  }

}
