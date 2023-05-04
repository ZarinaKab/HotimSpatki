import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AppComponent} from "../../../../app.component";
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { LoginService } from "../../../../layout/login.service";
import {CategoryService} from "../../../../category.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private loginService: LoginService,
        private location: Location,
        private categoryService: CategoryService

    ) {
    }
    logged = false;
    email = '';
    password1 = '';

        ngOnInit(): void {
            const token = localStorage.getItem('token');
            if(token) {
                this.logged = true;
            }
        }

        goBack(): void {
            this.location.back();
        }

        loginFunc(): void {
            this.categoryService.login(this.email, this.password).subscribe((data) => {

                localStorage.setItem('token', data.token);
                this.logged = true;
                this.email = '';
                this.password = '';
            });
        }
    logout() {
        this.logged = false;
        localStorage.removeItem('token');
    }
}
