import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent },
        // { path: './shopping-cart', component: ShoppingCartComponent},
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
