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
    this.isEmpty = false;
  }

  removeItem(name: string) {
    const index = this.items.findIndex(
      (it) => it.name.toUpperCase().trim() === name.toUpperCase().trim()
    );
    if (index !== -1) {
      this.items.splice(index, 1);
      if (this.items.length === 0) {
        this.isEmpty = true;
      }
    }
  }

  removeAllItems() {
    this.items = [];
    this.isEmpty = true;
  }

  existsItem(name: string): boolean {
    return this.items.some(
      (it) => it.name.toUpperCase().trim() === name.toUpperCase().trim()
    );
  }

  editItem(name: string, newDescription: string) {
    const item = this.items.find(
      (it) => it.name.toUpperCase().trim() === name.toUpperCase().trim()
    );
    if (item) {
      item.description = newDescription;
    }
  }
}
