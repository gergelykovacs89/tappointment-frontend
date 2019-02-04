import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../shared/models/user.model';


const REG_API_ENDPOINT = 'http://localhost:3000/api/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: UserModel) {
    return this.httpClient.post(REG_API_ENDPOINT, userData);
  }


}
