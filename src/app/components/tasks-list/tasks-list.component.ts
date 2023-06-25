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

  editedIndex!: number;

  isEdit: boolean = false;

  ngOnInit(): void {
    // console.log(this.editedIndex);
  }

  addTask(): void {
    if (this.newTask.title === '') {
      alert('task cannot be empty');
    } else {
      this.tasks.push(JSON.parse(JSON.stringify(this.newTask)));
      this.newTask.title = '';
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
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
  }
  cancelEdit() {
    this.newTask.title = '';
    this.isEdit = false;
  }

  setTaskAsDone(index: number) {
    console.log(this.tasks[index]);
    this.tasks[index].isDone = true;
    console.log(this.tasks[index]);
  }
}
