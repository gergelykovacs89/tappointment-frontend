import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../shared/models/user.model';
import {map} from 'rxjs/operators';


const REG_API_ENDPOINT = 'http://localhost:3000/api/register';
const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: UserModel) {
    return this.httpClient.post(REG_API_ENDPOINT, userData);
  }

  loginUser(userData: UserModel) {
    return this.httpClient.post(LOGIN_API_ENDPOINT, {
      email: userData.email,
      password: userData.password
    })
      .pipe(map((res) => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res['user'], ['email', 'id']));
          localStorage.setItem('userToken', JSON.stringify(res['userToken']));
        }
        return res;
      }));
  }


}
