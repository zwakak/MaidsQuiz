import { Injectable } from '@angular/core';
import { User } from './User';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ResultList} from './ResultList';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    result: ResultList;
    user: User;
    postUrl = 'https://reqres.in/api/users?page=';
    userDetails = 'https://reqres.in/api/users/';

    constructor(private http: HttpClient) {
    }


    getUsers(length): Observable<ResultList> {
        return this.http.get<any>(this.postUrl + length + '')
            .pipe(
                map(response => {
                    this.result = response;
                    return this.result;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                    }
                    return throwError('backend comm error');
                })
            );
    }

    getUserDetails(id): Observable<User> {
        return this.http.get<any>(this.userDetails + id + '')
            .pipe(
                map(response => {
                    this.user = response.data;
                    return this.user;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // this.route.navigate(['/login']);
                    }
                    return throwError('backend comm error');
                })
            );
    }
}


