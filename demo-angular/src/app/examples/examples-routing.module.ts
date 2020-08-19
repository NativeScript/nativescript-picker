import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { GettingStartedExampleComponent } from "./getting-started/getting-started-example.component";
import { StylingExampleComponent } from "./styling/styling-example.component";
import { ValueAPIExampleComponent } from "./value-api/value-api.component";
import { ReactiveFormsExampleComponent } from "./reactive-forms/reactive-forms-example.component";
import { NavigationComponent } from "../navigation/navigation.component";

const routes: Routes = [
    { path: "", component: NavigationComponent },
    { path: "getting-started-example", component: GettingStartedExampleComponent },
    { path: "styling-example", component: StylingExampleComponent },
    { path: "value-api-example", component: ValueAPIExampleComponent },
    { path: "reactive-forms-example", component: ReactiveFormsExampleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule { }
