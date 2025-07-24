import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PoRadioGroupOption, PoStepperComponent, PoStepComponent, PoNotificationService, PoModule } from '@po-ui/ng-components';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { Step } from '../../interface/step';

@Component({
  selector: 'app-voting-room',
  standalone: true,
  imports: [PoModule, FormsModule],
  templateUrl: './voting-room.component.html',
  styleUrl: './voting-room.component.css'
})
export class VotingRoomComponent implements OnInit {

  @ViewChild('meuStepper') meuStepper: PoStepperComponent | undefined;

  public passoAtual: string | number | PoStepComponent | undefined;
  public task: Task | undefined;
  private firebase = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  ngOnInit(): void {
    this.getTaskData()
  }

  // Opções para o radio group do Passo 1
  readonly objectiveOptions: PoRadioGroupOption[] = [
    { label: 'P - Muito claro com pouca chance de alteração', value: 1 },
    { label: 'M - Claro com alguma chance de alteração', value: 2 },
    { label: 'G - Pouco claro com alta chance de alteração', value: 3 },
    { label: '? - Não consigo opinar', value: -1 }
  ];

  // Opções para o radio group do Passo 2
  readonly developmentOptions: PoRadioGroupOption[] = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: -1}
  ];

  // Opções para o radio group do Passo 3
  readonly testsOptions: PoRadioGroupOption[] = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: -1 }
  ];

  public readonly steps: Step[] = [
    { label: 'Escopo',
      id: '1',
      values: ['Houve um completo entendimento de todo escopo dessa história?', 'Enxerga a possibilidade de precisar refinar melhor o como a tarefa será realizada?', 'Acredita que a história em questão possa trazer novas demandas como o adaptação de funcionalidades pré-existentes?'],
      options: this.objectiveOptions,
      answer: 0
    },
    { label: 'Desenvolvimento',
      id: '2',
      values: ['Desenvolvimento - Deve integrar com outro sistema?', 'A validação exige contato com times externos?', 'Desenvolvimento do teste unitário é complexo?'],
      options: this.developmentOptions,
      answer: 0
    },
    { label: 'Testes',
      id: '3',
      values: ['O teste manual é necessário? Domina a configuração necessária e tem os pré-requisitos para o teste?', 'O teste exige interação com times externos?'],
      options: this.testsOptions,
      answer: 0
    },
  ];

  getTaskData(){
    if(this.route.snapshot.paramMap.get('taskId')){
      this.firebase.getTask(this.route.snapshot.paramMap.get('taskId')!).subscribe(
        data => {
          this.task = data
        },
        error => this.poNotification.error(error)
      )
    }
  }

  atualizarPassoAtual(step: string | PoStepComponent | number) {
    this.passoAtual = typeof step === 'object' ? step.label : step;
  }

  next(){
    this.meuStepper?.next();
  }

  // Função que será executada ao clicar em "Finalizar" no stepper
  finalizarAcao() {
    let questions = this.steps.length;
    let points = 0;
    let result = 0;

    if(this.task?.taskData?.voting){

      this.steps.forEach((step: Step) => {
        if(step.answer > 0 ){
          points += step.answer
        }else{
          questions--
        }
      })

      result = questions >= 1 ? Math.round(points/questions): points;

      this.task!.taskData!.updatedAt = new Date();

      for (const voter of this.task!.taskData!.voters) {
        if (voter.name === localStorage.getItem('user')) {
          voter.hasVoted = true;
          voter.vote = result;
          if(result == 0){
            voter.size = "?";
          }else if(result == 1){
            voter.size = "P";
          }else if(result == 2){
            voter.size = "M";
          }else if(result == 3){
            voter.size = "G";
          }
        }
      }

      this.firebase.updateTask(this.task!).then(
      () => {
        //this.poNotification.success('Task atualizada com sucesso!');
      }).catch(error => {
        this.poNotification.error(error);
      });

    }

    this.router.navigate(['/voting-result', this.route.snapshot.paramMap.get('sessionId'), this.route.snapshot.paramMap.get('taskId') ]);

  }

}
