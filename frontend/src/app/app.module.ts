import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';

import { AboutUsComponent } from './demo/components/about-us/about-us.component';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, AboutUsComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
    ],
    providers: [
        //{ provide: LocationStrategy, useClass: HashLocationStrategy },
        ProductService
    ],
    exports: [
        AboutUsComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
