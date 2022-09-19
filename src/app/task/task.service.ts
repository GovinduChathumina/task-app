import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = "http://localhost:8000/api/tasks";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  create(task:any): Observable<Task> {
    return this.httpClient.post<Task>(this.apiURL, JSON.stringify(task), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  find(id:any): Observable<Task> {
    return this.httpClient.get<Task>(this.apiURL +'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id:any, task:any): Observable<Task> {
    return this.httpClient.put<Task>(this.apiURL +'/'+ id, JSON.stringify(task), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id:any){
    return this.httpClient.delete<Task>(this.apiURL +'/'+ id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
