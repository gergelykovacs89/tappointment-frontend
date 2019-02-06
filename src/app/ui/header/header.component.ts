import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {UserModel} from '../../shared/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  user: UserModel;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.user = user);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.authService.logout();
  }
}
