import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptPickerModule } from "nativescript-picker/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GettingStartedExampleComponent } from "./examples/getting-started/getting-started-example.component";
import { DataItemService } from "./examples/services/data-item.service";
import { StylingExampleComponent } from "./examples/styling/styling-example.component";
import { ValueAPIExampleComponent } from "./examples/value-api/value-api.component";
import { NavigationComponent } from "./navigation/navigation.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptPickerModule
    ],
    declarations: [
        AppComponent,
        NavigationComponent,
        StylingExampleComponent,
        GettingStartedExampleComponent,
        ValueAPIExampleComponent
    ],
    providers: [
        DataItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
