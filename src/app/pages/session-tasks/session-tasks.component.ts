import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  readonly userName = sessionStorage.getItem("user")
  readonly sessionName = sessionStorage.getItem("sessionName")
  sessionId: string | null = "";
  tasks: TaskModel[] | undefined;
  newTaskId: string | undefined;
  newTaskDescription: string | undefined;

  private addNewTask() {
    if (this.form.invalid) {
      const orderInvalidMessage = 'Choose the items to confirm the order.';
      this.poNotification.warning(orderInvalidMessage);
    } else {
      this.confirm.loading = true;

      setTimeout(() => {
        this.poNotification.success(`teste`);
        this.confirm.loading = false;
        this.closeModal();
      }, 700);
    }
  }
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.getTasks()
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

  confirmTask() {
    this.addNewTask();
  }

  restore() {
    this.form.reset();
  }

}


