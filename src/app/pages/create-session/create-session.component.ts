import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  standalone: false,

  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent implements OnInit {
  @ViewChild('reactiveFormData', { static: true }) reactiveFormModal!: PoModalComponent;

  reactiveForm!: UntypedFormGroup;
  sessionId: string | null | undefined;
  buttonLabel: string = "Criar sessão"

  public readonly modalPrimaryAction: PoModalAction = {
    action: () => this.reactiveFormModal.close(),
    label: 'Close'
  };

  constructor(
    private fb: UntypedFormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.createReactiveForm();

  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      this.sessionId = params.get('sessionId');

      if( !this.sessionId && localStorage.getItem("session") ){
        this.sessionId = localStorage.getItem("session");
      }

      this.firebaseService.getSession(this.sessionId!).subscribe(
        (data) => {
          if(data){
            localStorage.setItem('sessionName', data.sessionData.name )
            localStorage.setItem("session",this.sessionId!)
            localStorage.setItem("creator",data.sessionData.creator)
            localStorage.setItem("sessionName",data.sessionData.name)

            if(localStorage.getItem("user")){
              this.router.navigate(['/session', this.sessionId]);
            }

          }

        },
        (error) => {console.log(error)}
      )

    });

    if (this.sessionId){
      this.buttonLabel = "Acessar sessão"
      this.reactiveForm.patchValue({name: this.sessionId})
    }
  }


  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      creator: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      name: [this.sessionId, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });
  }

  saveForm() {
    this.reactiveFormModal.open();
  }

  onClick() {
    const sessionData = this.reactiveForm.value; // Obtendo os dados do formulário

    if (this.sessionId){
      localStorage.setItem("user",sessionData.creator)
      this.router.navigate(['/session', this.sessionId!]);
    }else{
      if (this.reactiveForm.valid) {
        this.firebaseService.addSession(sessionData).then(
        (data) => { console.log('Sessão adicionada com sucesso!'+data);

          localStorage.setItem("session",data.id)
          localStorage.setItem("user",sessionData.creator)
          localStorage.setItem("creator",sessionData.creator)
          localStorage.setItem("sessionName",sessionData.name)

          this.router.navigate(['/session', data.id]);

          this.reactiveForm.reset(); // Resetando o formulário após o envio
        }).catch(error => {
          console.error('Erro ao adicionar sessão: ', error);
        });
      }
    }
  }
}
