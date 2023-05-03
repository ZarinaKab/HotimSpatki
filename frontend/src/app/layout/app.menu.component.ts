import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PremiumItem } from './premiumitems';
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {
        this.tieredPremiumItems = [
            { label: 'Organs', icon: 'pi pi-fw pi-eye', routerLink: ['/uikit/list'] },
            { label: 'Friend', icon: 'pi pi-fw pi-globe', routerLink: ['/uikit/list'], },
            { label: 'Killer', icon: 'pi pi-user-minus', routerLink: ['/uikit/list'], }
        ]
    }
    premiumVisible = false;
    tieredPremiumItems: PremiumItem[] = [];
    premiumItems!: PremiumItem[];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Main', icon: 'pi pi-home', routerLink: ['/uikit/list'] },
                    { label: 'Teacher', icon: '' , routerLink: ['/uikit/list'] },
                    { label: 'Babysitter', icon: 'pi pi-fw pi-heart', routerLink: ['/uikit/list'] },
                    { label: 'Clean', icon: 'pi pi-fw pi-trash', routerLink: ['/uikit/list'] },
                    { label: 'Repair', icon: 'pi pi-fw pi-wrench', routerLink: ['/uikit/list'] },
                    { label: 'Cook', icon: 'pi pi-fw pi-apple', routerLink: ['/uikit/list'] },
                    { label: 'Electrician', icon: 'pi pi-fw pi-bolt', routerLink: ['/uikit/list'] },
                ],
            },
            {
                label: 'Premium',
                items: [
                    { label: 'Organs', icon: 'pi pi-fw pi-eye', routerLink: ['/uikit/list'], badge: 'NEW' },
                    { label: 'Friend', icon: 'pi pi-fw pi-link', routerLink: ['/uikit/list'], badge: 'NEW' },
                    { label: 'Killer', icon: 'pi pi-times', routerLink: ['/uikit/list'], badge: 'NEW' }
                ]
            },
        ]
    }
}
