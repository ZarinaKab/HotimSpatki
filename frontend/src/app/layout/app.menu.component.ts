import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PremiumItem } from './premiumitems';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {    }
    premiumVisible = false;
    tieredPremiumItems: PremiumItem[] = [
        { label: 'Bio Products', icon: 'pi pi-fw pi-eye', routerLink: ['/uikit/list'] },
        { label: 'Friend', icon: 'pi pi-fw pi-globe', routerLink: ['/uikit/list'], },
        { label: 'Killer', icon: 'pi pi-user-minus', routerLink: ['/uikit/list'], }
    ];
    premiumItems!: PremiumItem[];
    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Main', icon: 'pi pi-home', routerLink: ['/uikit/list'] },
                    { label: 'Teacher', icon: 'pi pi-globe' , routerLink: ['/uikit/list'] },
                    { label: 'Babysitter', icon: 'pi pi-fw pi-heart', routerLink: ['/uikit/list'] },
                    { label: 'Clean', icon: 'pi pi-fw pi-trash', routerLink: ['/uikit/list'] },
                    { label: 'Repair', icon: 'pi pi-fw pi-wrench', routerLink: ['/uikit/list'] },
                    { label: 'Cook', icon: 'pi pi-fw pi-apple', routerLink: ['/uikit/list'] },
                    { label: 'Electrician', icon: 'pi pi-fw pi-bolt', routerLink: ['/uikit/list'] },
                ],
            }
        ];

        // Check if the user is a premium user and has paid for access to the premium categories

        if (true) {
            // If the user is a premium user, show the premium category and its items
            this.model.push({
                label: 'Premium',
                visible: true, // Show the category
                items: [
                    // Any other premium items can be added here
                    { label: 'Bio Product', icon: 'pi pi-fw pi-eye', routerLink: ['/uikit/list'] },
                    { label: 'Friend', icon: 'pi pi-fw pi-globe', routerLink: ['/uikit/list'], },
                    { label: 'Killer', icon: 'pi pi-user-minus', routerLink: ['/uikit/list'], }
                ]
            });
        } else {
            // If the user is not a premium user, do not show the premium category
            this.model.push({
                label: 'Premium',
                visible: false, // Hide the category
                items: []
            });
        }
    }

}
