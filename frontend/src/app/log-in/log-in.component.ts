import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor(private router: Router,
              private loginService: LoginService,
              private location: Location
  ) {
  }

  username = '';
  password = '';

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  loginFunc(): void {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      AppComponent.isLogged = true;
      this.location.back();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', this.username);
      this.username = '';
      this.password = '';
    });
  }
}