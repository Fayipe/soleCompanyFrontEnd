import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseUrl = environment.apiUrl + environment.basePath;
    constructor(private http: HttpClient) { }

    createUser(userDate: any) {
        return this.http.post(this.baseUrl + `/users/signup`, userDate);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}