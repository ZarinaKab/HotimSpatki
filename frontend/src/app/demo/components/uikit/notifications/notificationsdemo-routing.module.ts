import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsdemoComponent } from "./notificationsdemo.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NotificationsdemoComponent }
    ])],
    exports: [RouterModule]
})
export class NotificationsdemoRoutingModule { }
