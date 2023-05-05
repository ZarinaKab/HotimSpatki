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



    password!: string;
    username!: string;
    logged = false;

    constructor(
        private categoryService: CategoryService

    ) {
    }
    login(){
        this.categoryService.login(this.username, this.password).subscribe((data) => {

            localStorage.setItem('token', data.token);

            this.logged = true;
            this.username = '';
            this.password = '';
        });
    }

    ngOnInit(): void {
        const token = localStorage.getItem('token');
        if(token) {
            this.logged = true;
        }
    }




    // logout() {
    //     this.logged = false;
    //     localStorage.removeItem('token');
    // }
}
