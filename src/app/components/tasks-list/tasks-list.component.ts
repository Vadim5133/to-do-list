import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.interface';

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

  filteredTasks: Task[] = [];

  editedIndex!: number;

  isOnlyCurrentTasks: boolean = false;

  isEdit: boolean = false;

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

  toggleShownTasks(): void {
    this.filteredTasks = this.tasks.filter(
      (task) => task.isDone !== this.isOnlyCurrentTasks
    );
    if (this.isOnlyCurrentTasks === false) {
      this.filteredTasks = this.tasks;
    }
  }
}
