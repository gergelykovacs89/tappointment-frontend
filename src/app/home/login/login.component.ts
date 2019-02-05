import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const email = '';
    const password = '';

    this.loginForm = new FormGroup({
        'email': new FormControl(email, Validators.compose([
          Validators.email,
          Validators.required])),
        'password': new FormControl(password, Validators.compose([]))
      }
    );
  }

  onSubmit() {
    this.userService.loginUser(this.loginForm.value)
      .subscribe((res) => {
          if (res['status'] === 'OK') {
            alert(res['message']);
            this.router.navigate(['/profiles']);
          }
        },
        (err) => {
          if (err.error.status === 'WRONG_PASSWORD') {
            alert('Wrong e-mail or password');
            this.loginForm.reset();
          }
        });
  }
}
