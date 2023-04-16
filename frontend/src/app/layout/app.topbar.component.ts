import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { TieredMenuModule } from 'primeng/tieredmenu';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent{
    menuVisible = false;
    tieredItems: MenuItem[] = [];
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {
        this.tieredItems = [
            {
                label: 'Profile',
                icon: 'pi pi-id-card',
                routerLink: ['/uikit/formlayout']
            },
            {
                label: 'Notifications',
                icon: 'pi pi-bell',
                routerLink: ['/uikit/notifications']
            },

            { separator: true },
            {
                label: 'Log-in',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login']
            },
            {
                label: 'Log-out',
                icon: 'pi pi-fw pi-sign-out',
                routerLink: ['']
            }
        ]
    }


}
