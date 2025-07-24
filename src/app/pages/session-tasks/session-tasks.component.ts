import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskModel } from '../../models/task.model';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-tasks',
  standalone: true,
  imports: [PoModule,ReactiveFormsModule,FormsModule, TaskComponent, CommonModule],
  templateUrl: './session-tasks.component.html',
  styleUrl: './session-tasks.component.css'
})
export class SessionTasksComponent implements OnInit {
  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  userName = localStorage.getItem("user")
  sessionName = localStorage.getItem("sessionName")
  sessionId: string | null = "";
  tasks: Task[] | undefined;
  newTask: TaskModel = new TaskModel("","","",new Date(), new Date(),0,[],false,false);
  isCreator = false;
  public readonly actions: PoPageAction[] = [{label: 'Adicionar nova tarefa', action: () => this.addTask()}, {label:'Sair da sessão', action: () => this.logout()}];

  private firebaseService = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if( this.sessionId && localStorage.getItem('session') !== this.sessionId ){
      localStorage.setItem('session', this.sessionId! )
      if( !localStorage.getItem('user') ){
        this.router.navigate(['createsession'])
      }
      this.firebaseService.getSession(this.sessionId!).subscribe(
          (data) => {
            if(data){
              localStorage.setItem('sessionName', data.sessionData.name )
              this.sessionName =  data.sessionData.name
            }

          },
          (error) => {console.log(error)}
      )
    }

    this.isCreator = this.userName == localStorage.getItem('creator')

    this.actions[0].visible = this.isCreator;

    this.getTasks()
  }

  addNewTask() {
    if (this.form.invalid) {
      const InvalidMessage = 'Verifique os campos';
      this.poNotification.warning(InvalidMessage);
    } else {
      this.confirm.loading = true;
      this.newTask.sessionId = this.sessionId!
      this.firebaseService.addTask(this.newTask).then(
      () => {
        this.poNotification.success(`Task adicionada com sucesso!`);
        this.confirm.loading = false;
        this.form.reset();
        this.closeModal();

      }).catch(error => {
        this.poNotification.error(error);
      });
    }
  }

  getTasks() {
    this.firebaseService.getTasks(this.sessionId!).subscribe(
      (data) => {
        this.tasks = data;
      }
    );
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['createsession'])
  }

  addTask() {
    this.poModal.open()
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
      this.addNewTask();
    },
    label: 'Confirm'
  };

  closeModal() {
    this.form.reset();
    this.poModal.close();
  }

  restore() {
    this.form.reset();
  }

}


