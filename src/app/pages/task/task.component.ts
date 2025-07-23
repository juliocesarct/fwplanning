import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Voter } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PoModule, CommonModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Input() task: undefined | Task;
  @Input() isCreator = false;

  private sessionId: string | null = null;
  public isInVotingRoom = false;
  public resultSize: string | undefined;
  public taskTag: any;
  public readonly orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
  public votesBySize = [{label: 'P', data: 0},{label: 'M', data: 0},{label: 'G', data: 0}];
  public newResult: number | undefined;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);
  private poNotification = inject(PoNotificationService);

  get totalParticipantes(): string {
    const voters = this.task?.taskData?.voters;
    if (!Array.isArray(voters)) {
      return '0';
    }
    return voters.filter(voter => voter.hasVoted).length.toString();
  }

  ngOnInit(): void {

    if( (this.task?.taskData?.voting ?? false) || (this.task?.taskData?.result && !this.task?.taskData?.complete) ) {
      this.taskTag = {value: 'Em andamento', type: 'warning'}
    } else {
      this.taskTag = this.task?.taskData?.complete ?? false ? {value: 'Finalizado', type: 'success'} : {value: 'Pendente', type: 'danger'}
    }
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if((this.task?.taskData?.result) == 1){
      this.resultSize = "P"
    }else if((this.task?.taskData?.result ) == 2){
      this.resultSize = "M"
    }else if((this.task?.taskData?.result ?? 0) >= 3){
      this.resultSize = "G"
    }

    this.task?.taskData?.voters .forEach(voter => {
      if(voter.hasVoted && voter.vote > 0){
        this.votesBySize[voter.vote-1].data += 1;
      }
    });

  }

  plan(){

    localStorage.setItem('voting','true')
    this.task!.taskData!.voting = true;
    this.task!.taskData!.updatedAt = new Date();
    this.task!.taskData!.voters = [];

    this.firebase.updateTask(this.task!).then(
      () => {
        console.log('Task atualizada com sucesso!');
      }).catch(error => {
        console.error('Erro ao atualizar task: ', error);
      });

  }

  vote(){

    const voter: Voter = new Voter(localStorage.getItem('user')!,false,0,'?');
    const canPushVoter = !this.task!.taskData!.voters.some(
      (existingVoter) => existingVoter.name === voter.name
    );

    if(canPushVoter){
      this.task!.taskData!.updatedAt = new Date();
      this.task!.taskData!.voters.push(voter)

      this.firebase.updateTask(this.task!).then(
        (data) => {
          console.log('Task atualizada com sucesso!'+data);
        }).catch(error => {
          console.error('Erro ao atualizar task: ', error);
        });
    }

    this.router.navigate(['voting-room/',this.sessionId, this.task!.id])
  }

  complete(){

    const numberOfVotes = 0;
    const voteSum = 0;

    if(!this.task!.taskData!.voting && !this.task!.taskData!.complete){
      this.task!.taskData!.complete = true;
    }

    localStorage.setItem('voting','false');
    this.task!.taskData!.updatedAt = new Date();

    this.task!.taskData!.voting = false;

    const result = Math.round(voteSum / numberOfVotes);

    if(result <= 1){
      this.resultSize = "P"
    }else if(result == 2){
      this.resultSize = "M"
    }else if(result >= 3){
      this.resultSize = "G"
    }

    this.task!.taskData!.result = result;

    this.updateTask(this.task!)

    this.router.navigate(['session/',this.sessionId])
  }

  closeModal(){
    this.poModal.close()
  }

  openModal(){
    this.poModal.open()
  }

  setNewResult(){
    this.task!.taskData!.result = this.newResult ?? 0;

    if(this.task!.taskData!.result <= 1){
      this.resultSize = "P"
    }else if(this.task!.taskData!.result == 2){
      this.resultSize = "M"
    }else if(this.task!.taskData!.result >= 3){
      this.resultSize = "G"
    }

    this.updateTask(this.task!)

    console.log(this.task?.taskData?.result)
  }

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.setNewResult();
    },
    label: 'Confirm'
  };

  updateTask(task: Task){
    this.firebase.updateTask(task!).then(
      () => {
        this.poNotification.success('Task atualizada com sucesso!');
      }).catch(error => {
        this.poNotification.error(error);
      });
  }
}
