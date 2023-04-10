import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class RegisterComponent implements OnInit {
  email: string | undefined;
  login: string | undefined;
  password: string | undefined;
  name: string | undefined;
  surname: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  registerFunc(): void {
    window.alert(`Registration is not available now. Please try again later`);
  }
}