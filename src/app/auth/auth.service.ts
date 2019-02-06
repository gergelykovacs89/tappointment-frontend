import { Injectable } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserModel} from '../shared/models/user.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const REG_API_ENDPOINT = 'http://localhost:3000/user/register';
const LOGIN_API_ENDPOINT = 'http://localhost:3000/user/login';
const GET_USER_BY_TOKEN_API_ENDPOINT = 'http://localhost:3000/user/get-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  getUserByToken() {
    return this.httpClient.get(GET_USER_BY_TOKEN_API_ENDPOINT);
  }

  registerUser(userData: UserModel) {
    return this.httpClient.post(REG_API_ENDPOINT, userData);
  }

  loginUser(userData: UserModel) {
    return this.httpClient.post(LOGIN_API_ENDPOINT, {
      email: userData.email,
      password: userData.password
    })
      .pipe(map((res: Response) => {
        if (res) {
          this.setUser(res);
        }
        return res;
      }));
  }

  public handleAuthentication(): void {
    if (this.isUserAuthenticated()) {
      this.getUserByToken()
        .subscribe((res: Response) => {
            // @ts-ignore
            if (res['status'] === 'OK') {
              this.setUser(res);
            }
          },
          (err) => {
            if (err) {
              localStorage.removeItem('currentUser');
              localStorage.removeItem('userToken');
            }
          });
    } else {
      this.router.navigate(['/login']);
    }
  }

  setUser(res: Response) {
    const user = new UserModel(res['user'].id, res['user'].email);
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(res['user'], ['email', 'id']));
    localStorage.setItem('userToken', JSON.stringify(res['userToken']));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

  public isUserAuthenticated(): boolean {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return !!userToken;
  }
}
