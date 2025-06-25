import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoRadioGroupOption, PoStepperComponent, PoStepComponent } from '@po-ui/ng-components';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Voter } from '../../models/task.model';

@Component({
  selector: 'app-voting-room',
  standalone: false,

  templateUrl: './voting-room.component.html',
  styleUrl: './voting-room.component.css'
})
export class VotingRoomComponent implements OnInit {

  @ViewChild('meuStepper') meuStepper: PoStepperComponent | undefined;

  passoAtual: any;
  task: Task | undefined;

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('taskId')){
      this.firebase.getTask(this.route.snapshot.paramMap.get('taskId')!).subscribe(
        data => {
          this.task = data
        },
        error => console.log(error)
      )
    }
  }

  // Opções para o radio group do Passo 1
  readonly objectiveOptions: Array<PoRadioGroupOption> = [
    { label: 'P - Muito claro com pouca chance de alteração', value: 1 },
    { label: 'M - Claro com alguma chance de alteração', value: 2 },
    { label: 'G - Pouco claro com alta chance de alteração', value: 3 },
    { label: '? - Não consigo opinar', value: -1 }
  ];

  // Opções para o radio group do Passo 2
  readonly developmentOptions: Array<PoRadioGroupOption> = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: -1}
  ];

  // Opções para o radio group do Passo 3
  readonly testsOptions: Array<PoRadioGroupOption> = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: -1 }
  ];

  steps: Array<any> = [
    { label: 'Escopo',
      id: '1',
      values: ['Houve um completo entendimento de todo escopo dessa história?', 'Enxerga a possibilidade de precisar refinar melhor o como a tarefa será realizada?', 'Acredita que a história em questão possa trazer novas demandas como o adaptação de funcionalidades pré-existentes?'],
      options: this.objectiveOptions,
      answer: ''
    },
    { label: 'Desenvolvimento',
      id: '2',
      values: ['Desenvolvimento - Deve integrar com outro sistema?', 'A validação exige contato com times externos?', 'Desenvolvimento do teste unitário é complexo?'],
      options: this.developmentOptions,
      answer: ''
    },
    { label: 'Testes',
      id: '3',
      values: ['O teste manual é necessário? Domina a configuração necessária e tem os pré-requisitos para o teste?', 'O teste exige interação com times externos?'],
      options: this.testsOptions,
      answer: ''
    },
  ];

  atualizarPassoAtual(step: PoStepComponent | number) {
     typeof step === 'object' ? this.passoAtual = step.label : this.passoAtual = step;
  }

  next(){
    this.meuStepper?.next();
  }

  // Função que será executada ao clicar em "Finalizar" no stepper
  finalizarAcao() {
    var questions = this.steps.length;
    var points = 0;
    var result = 0

    this.steps.forEach((step: any, index: number) => {
      step.answer > 0 ? points += step.answer : questions-- ;
    })

    result = questions >= 1 ? Math.round(points/questions): points;

    alert(result);

    this.task!.taskData!.updatedAt = new Date();

    if(questions >= 1){
      for (const voter of this.task!.taskData!.voters) {
        if (voter.name === localStorage.getItem('user')) {
          voter.hasVoted = true;
          voter.vote = result;
        }
      }

      this.firebase.updateTask(this.task!).then(
      () => {
        console.log('Task atualizada com sucesso!');
      }).catch(error => {
        console.error('Erro ao atualizar task: ', error);
      });
    }
    this.router.navigate(['/session', this.route.snapshot.paramMap.get('sessionId') ]);
  }

}
