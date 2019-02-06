import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/custom-validators';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const email = '';
    const password = '';
    const confirmPassword = '';
    const fullName = '';


    this.userForm = new FormGroup({
        'email': new FormControl(email, Validators.compose([
          Validators.email,
          Validators.required])),
        'password': new FormControl(password, Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(/\d/, {hasNumber: true}),
          CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
          CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
          CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
          Validators.minLength(8)])),
        'confirmPassword': new FormControl(confirmPassword, Validators.compose([Validators.required])),
        'fullName': new FormControl(fullName)
      },
      {
        validators: CustomValidators.passwordMatchValidator
      }
    );
  }

  onSubmit() {
    this.authService.registerUser(this.userForm.value)
      .subscribe((res) => {
        if (res['status'] === 'OK') {
          alert(res['message']);
          this.router.navigate(['/login']);
        }  else {
          alert('Something went wrong..., please try again');
          this.userForm.reset();
        }
      });
  }
}
