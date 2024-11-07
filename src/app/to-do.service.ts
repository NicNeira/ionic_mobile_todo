import { Injectable } from '@angular/core';

interface ToDoItem {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  public items: ToDoItem[];
  public isEmpty: boolean;

  constructor() {
    this.items = [];
    this.isEmpty = true;
  }

  addItem(name: string, description: string) {
    this.items.push({ name, description });
    this.isEmpty = false; // Actualizar la bandera isEmpty cuando se agrega un item
  }

  removeItem(name: string) {
    const index = this.items.findIndex(
      (it) => it.name.toUpperCase().trim() === name.toUpperCase().trim()
    );
    if (index !== -1) {
      this.items.splice(index, 1);
      this.isEmpty = this.items.length === 0;
    }
  }

  removeAllItems() {
    this.items = [];
    this.isEmpty = true; // Actualizar isEmpty cuando se eliminan todos los items
  }

  existsItem(name: string): boolean {
    return this.items.some(
      (it) => it.name.toUpperCase().trim() === name.toUpperCase().trim()
    );
  }

  editItem(originalName: string, newName: string, newDescription: string) {
    const index = this.items.findIndex(
      (it) => it.name.toUpperCase().trim() === originalName.toUpperCase().trim()
    );
    if (index !== -1) {
      this.items[index].name = newName;
      this.items[index].description = newDescription;
    }
  }
}
