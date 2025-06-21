import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoStepperItem , PoRadioGroupOption, PoStepperComponent  } from '@po-ui/ng-components';
import { delay, finalize, Observable, of, tap } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-session-room',
  standalone: false,

  templateUrl: './session-room.component.html',
  styleUrl: './session-room.component.css'
})
export class SessionRoomComponent {

  @ViewChild('meuStepper') meuStepper: PoStepperComponent | undefined;

  sessionUsers = ['J','C','P']
  passoAtual: any

  // Objeto que vai armazenar as seleções do usuário em cada passo
  selecoes = {
    objective: '',
    development: '',
    tests: ''
  };

  // Opções para o radio group do Passo 1
  readonly opcoesProjeto: Array<PoRadioGroupOption> = [
    { label: 'P - Muito claro com pouca chance de alteração', value: 1 },
    { label: 'M - Claro com alguma chance de alteração', value: 2 },
    { label: 'G - Pouco claro com alta chance de alteração', value: 3 },
    { label: '? - Não consigo opinar', value: 0 }
  ];

  // Opções para o radio group do Passo 2
  readonly opcoesTecnologia: Array<PoRadioGroupOption> = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: 0 }
  ];

  // Opções para o radio group do Passo 3
  readonly opcoesPrioridade: Array<PoRadioGroupOption> = [
    { label: 'P - Complexidade Baixa', value: 1 },
    { label: 'M - Complexidade Média', value: 2 },
    { label: 'G - Complexidade Alta', value: 3 },
    { label: '? - Não consigo opinar', value: 0 }
  ];

  atualizarPassoAtual() {
    this.passoAtual = this.meuStepper?.active
    console.log(this.meuStepper?.step)

    this.meuStepper!.next()
  }

  // Função que será executada ao clicar em "Finalizar" no stepper
  finalizarAcao() {
    const resumo = `Resumo das suas escolhas:\n
      - Escopo: ${this.selecoes.objective}
      - Desenvolvimento: ${this.selecoes.development}
      - Testes: ${this.selecoes.tests}`;

    alert(resumo);
  }

}
