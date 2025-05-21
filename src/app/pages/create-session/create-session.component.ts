import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  standalone: false,

  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent {
  @ViewChild('reactiveFormData', { static: true }) reactiveFormModal!: PoModalComponent;

  reactiveForm!: UntypedFormGroup;

  public readonly modalPrimaryAction: PoModalAction = {
    action: () => this.reactiveFormModal.close(),
    label: 'Close'
  };

  constructor(
    private fb: UntypedFormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.createReactiveForm();
  }

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      creator: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });
  }

  saveForm() {
    this.reactiveFormModal.open();
  }

  onClick() {
    if (this.reactiveForm.valid) {
      const sessionData = this.reactiveForm.value; // Obtendo os dados do formulário

      this.firebaseService.addSession(sessionData).then(
      (data) => { console.log('Sessão adicionada com sucesso!'+data);

        sessionStorage.setItem("session",data.id)
        sessionStorage.setItem("user",sessionData.creator)
        sessionStorage.setItem("creator",sessionData.creator)
        sessionStorage.setItem("sessionName",sessionData.name)

        this.router.navigate(['/session', data.id]);

        this.reactiveForm.reset(); // Resetando o formulário após o envio
      }).catch(error => {
        console.error('Erro ao adicionar sessão: ', error);
      });
    }
  }
}
