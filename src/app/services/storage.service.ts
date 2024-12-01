
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToDoItem } from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'todos';

  async saveTodos(todos: ToDoItem[]): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(todos)
    });
  }

  async getTodos(): Promise<ToDoItem[]> {
    const result = await Preferences.get({ key: this.STORAGE_KEY });
    return result.value ? JSON.parse(result.value) : [];
  }
}