import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonReorder,
  IonReorderGroup,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task.service';

import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ToDoItem } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonReorderGroup,
    IonItemSliding,
    IonReorder,
    IonItemOption,
    IonIcon,
    IonMenu,
    IonInput,
    IonButton,
    FormsModule,
    HttpClientModule,
    IonThumbnail,
    IonImg,
    IonItemOptions
  ],
})
export class TodoListPage implements OnInit {
  tasks: ToDoItem[] = [];
  newTaskName = '';
  newTaskDescription = '';
  newTaskImage: string = '';

  constructor(
    private taskService: TaskService,
    private cameraService: CameraService,
    private geolocationService: GeolocationService // Inyección del servicio
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  // Cargar todas las tareas
  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  // Añadir una nueva tarea
  async addTask() {
    if (this.newTaskName.trim() && this.newTaskDescription.trim()) {
      let position = { latitude: null, longitude: null };
      try {
        console.log('Obteniendo ubicación...');
        position = await this.geolocationService.getCurrentPosition();
        console.log('Ubicación obtenida:', position);
      } catch (error) {
        console.error('No se pudo obtener la ubicación', error);
      }

      const newTask: Omit<ToDoItem, 'id'> = {
        title: this.newTaskName,
        description: this.newTaskDescription,
        completed: false,
        imageUrl: this.newTaskImage,
        latitude: position.latitude,
        longitude: position.longitude,
      };

      this.taskService.addTask(newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTaskName = '';
        this.newTaskDescription = '';
        this.newTaskImage = '';
      });
    }
  }


  // Editar una tarea existente
  editTask(task: ToDoItem) {
    // Implementar la lógica de edición según los requerimientos
  }

  // Eliminar una tarea
  removeTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  // remove all tasks
  removeAllTasks() {
    const deleteObservables = this.tasks.map((task) =>
      this.taskService.deleteTask(task.id)
    );
    forkJoin(deleteObservables).subscribe(() => {
      this.tasks = [];
    });
  }

  // Reordenar las tareas
  reorderTasks(event: any) {
    const itemMove = this.tasks.splice(event.detail.from, 1)[0];
    this.tasks.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }

  async captureImage() {
    this.newTaskImage = await this.cameraService.takePicture();
  }
}
