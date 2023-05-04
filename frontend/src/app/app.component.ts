import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    static isLogged: boolean;
    constructor(private primengConfig: PrimeNGConfig, public router: Router) {
        AppComponent.isLogged = false;
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
