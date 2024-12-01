import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDoItem } from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl = `https://${environment.MockAPICode}.mockapi.io/api/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl);
  }

  getTask(id: string): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Omit<ToDoItem, 'id'>) {
    return this.http.post<ToDoItem>(`${this.apiUrl}`, task);
  }

  updateTask(id: string, task: Partial<ToDoItem>): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
