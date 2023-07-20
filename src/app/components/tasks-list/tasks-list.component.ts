import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];

  newTask: Task = {
    title: '',
    isDone: false,
  };

  searchValue: string = '';

  sortValue: string = 'none';

  filteredTasks: Task[] = [];

  editedIndex!: number;

  isOnlyCurrentTasks: boolean = false;

  isEdit: boolean = false;

  hide: boolean = true;

  ngOnInit(): void {
    this.tasks = [
      {
        title: 'Play',
        isDone: false,
      },
      {
        title: 'Eat',
        isDone: false,
      },
      {
        title: 'Sleep',
        isDone: false,
      },
    ];
    this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ]),
    });
  }

  addTask(): void {
    if (this.newTask.title === '') {
      alert('task cannot be empty');
    } else {
      this.tasks.push(JSON.parse(JSON.stringify(this.newTask)));
      this.newTask.title = '';
      this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
  }

  openEdit(task: Task, index: number): void {
    this.isEdit = true;
    this.newTask = JSON.parse(JSON.stringify(task));
    this.editedIndex = index;
  }

  saveEditedTask() {
    this.tasks.splice(
      this.editedIndex,
      1,
      JSON.parse(JSON.stringify(this.newTask))
    );
    this.isEdit = false;
    this.newTask.title = '';
    this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
  }
  cancelEdit() {
    this.newTask.title = '';
    this.isEdit = false;
  }

  setTaskAsDone(index: number) {
    this.tasks[index].isDone = true;
    this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  sortCurrentTaskFirst(): void {
    if (this.sortValue === 'currentTasksFirst') {
      this.filteredTasks.sort((a, b) => (a.isDone > b.isDone ? 1 : -1));
    } else if (this.sortValue === 'doneTasksFirst') {
      this.filteredTasks.sort((a, b) => (b.isDone > a.isDone ? 1 : -1));
    } else if (this.sortValue === 'none') {
      this.filteredTasks = this.tasks;
    }
  }

  toggleShownTasks(): void {
    this.filteredTasks = this.tasks.filter(
      (task) => task.isDone !== this.isOnlyCurrentTasks
    );
    if (this.isOnlyCurrentTasks === false) {
      this.filteredTasks = this.tasks;
    }
  }

  testSelection(): void {
    console.log(this.sortValue);
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Отправка формы - обработка введенных данных
      console.log(this.loginForm.value);
    }
  }
}
