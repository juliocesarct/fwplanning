import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from '../../models/task.model';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-session-tasks',
  standalone: false,

  templateUrl: './session-tasks.component.html',
  styleUrl: './session-tasks.component.css'
})
export class SessionTasksComponent {
  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  readonly userName = localStorage.getItem("user")
  readonly sessionName = localStorage.getItem("sessionName")
  sessionId: string | null = "";
  tasks: TaskModel[] | undefined;
  newTask: TaskModel = new TaskModel("","","","",new Date(),0,0);

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    //this.getTasks()
  }

  addNewTask() {
    if (this.form.invalid) {
      const InvalidMessage = 'Choose the items to confirm the teste.';
      this.poNotification.warning(InvalidMessage);
    } else {
      this.confirm.loading = true;

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


