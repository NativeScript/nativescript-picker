import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { NavigationComponent } from "./navigation/navigation.component";
import { StylingExampleComponent } from "./examples/styling/styling-example.component";
import { GettingStartedExampleComponent } from "./examples/getting-started/getting-started-example.component";
import { ValueAPIExampleComponent } from "./examples/value-api/value-api.component";

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: NavigationComponent },
    { path: "items/getting-started-example", component: GettingStartedExampleComponent },
    { path: "items/styling-example", component: StylingExampleComponent },
    { path: "items/value-api-example", component: ValueAPIExampleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
