import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AppConfigComponent } from './config/app.config.component';
import { PremiumItem } from './premiumitems';
import { AppMenuComponent } from './app.menu.component';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent{
    menuVisible = false;
    premiumVisible = false;
    tieredItems: MenuItem[] = [];
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    static layoutService: any;

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
    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme
        AppConfigComponent.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }
}