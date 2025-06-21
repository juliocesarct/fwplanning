import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel, Task } from '../../models/task.model';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
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
export class SessionTasksComponent {
  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  userName = localStorage.getItem("user")
  sessionName = localStorage.getItem("sessionName")
  sessionId: string | null = "";
  tasks: any;
  newTask: TaskModel = new TaskModel("","","",new Date(), new Date(),0,0,false);
  isCreator: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');

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

    this.getTasks()
  }

  addNewTask() {
    if (this.form.invalid) {
      const InvalidMessage = 'Choose the items to confirm the teste.';
      this.poNotification.warning(InvalidMessage);
    } else {
      this.confirm.loading = true;
      this.newTask.sessionId = this.sessionId!
      this.firebaseService.addTask(this.newTask).then(
      (data) => {
        this.poNotification.success(`Task adicionada com sucesso!`);
        this.confirm.loading = false;
        this.form.reset(); // Resetando o formulário após o envio
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


