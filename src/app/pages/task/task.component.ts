import { Component, computed, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Voter } from '../../models/task.model';
import { FirebaseService } from '../../services/firebase.service';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoTagType } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TagType{
  value: string,
  type: PoTagType
}

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
  public taskTag: TagType | undefined;
  public readonly orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
  public votesBySize = [{label: 'P', data: 0},{label: 'M', data: 0},{label: 'G', data: 0}];
  public newResult: number | undefined;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);
  private poNotification = inject(PoNotificationService);

  readonly resultSize = computed(() => {
    let result: undefined | string;

    if(this.task?.taskData?.result == 1){
      result = "P";
    }else if(this.task?.taskData?.result == 2){
      result = "M";
    }else if(this.task?.taskData?.result ?? 0 >= 3){
      result = "G";
    }
    return result;
  })

  get totalParticipantes(): string {
    const voters = this.task?.taskData?.voters;
    if (!Array.isArray(voters)) {
      return '0';
    }
    return voters.filter(voter => voter.hasVoted).length.toString();
  }

  ngOnInit(): void {

    if( (this.task?.taskData?.voting ?? false) || (this.task?.taskData?.result && !this.task?.taskData?.complete) ) {
      this.taskTag = {value: 'Em andamento', type: PoTagType.Warning}
    } else {
      this.taskTag = this.task?.taskData?.complete ?? false ? {value: 'Finalizado', type: PoTagType.Success} : {value: 'Pendente', type: PoTagType.Danger}
    }
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

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
        this.poNotification.success('Item atualizado com sucesso!')
      }).catch(error => {
        this.poNotification.error(`Erro ao atualizar task: `+error)
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
          this.poNotification.error(`Erro ao atualizar task: `+error)
        });
    }

    this.router.navigate(['voting-room/',this.sessionId, this.task!.id])
  }

  complete(){

    let numberOfVotes = 0;
    let voteSum = 0;

    if(!this.task!.taskData!.voting && !this.task!.taskData!.complete){
      this.task!.taskData!.complete = true;
    }

    localStorage.setItem('voting','false');
    this.task!.taskData!.updatedAt = new Date();

    this.task!.taskData!.voting = false;

    this.task?.taskData?.voters .forEach(voter => {
      if(voter.hasVoted && voter.vote > 0){
        numberOfVotes++;
        voteSum += voter.vote;
      }
    });

    this.task!.taskData!.result =  Math.round(voteSum / numberOfVotes);

    this.updateTask(this.task!)

  }

  closeModal(){
    this.poModal.close()
  }

  openModal(){
    this.poModal.open()
  }

  setNewResult(){
    this.task!.taskData!.result = this.newResult ?? 0;
    this.updateTask(this.task!);
  }

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.setNewResult();
    },
    label: 'Confirmar'
  };

  updateTask(task: Task){
    this.firebase.updateTask(task!).then(
      () => {
        this.poNotification.success('Item atualizado com sucesso!');
      }).catch(error => {
        this.poNotification.error(error);
      });
  }
}
