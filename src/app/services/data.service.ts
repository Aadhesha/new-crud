import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { User } from '../user-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   })
  // };
  
  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.log("Error:",error);
    return throwError(error);
  }

  getRegisteredUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl).pipe(
      tap(data => console.log("data:", data)),
      catchError(this.handleError)
    );
  }

  getUser (id: number): Observable<User> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<User>(url).pipe(
    catchError(this.handleError)
    );
  }


  addUser(user: User): Observable<User> { 
    // user.id = null;
    return this.http.post<User>(this.apiurl, user, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User>{
    let id = user.id;
    const url = `${this.apiurl}/${id}`;
    return this.http.put<User>(this.apiurl, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  deleteUser (id: number): Observable<User> {
    const url = `${this.apiurl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}
