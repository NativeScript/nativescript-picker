import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement, ModalDialogService } from "@nativescript/angular";
import {DIRECTIVES, PickerFieldComponent} from "./nativescript-picker.directives";
import { PickerField } from "../picker";

@NgModule({
    declarations: [DIRECTIVES],
    entryComponents: [PickerFieldComponent],
    exports: [DIRECTIVES],
    providers: [
        ModalDialogService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NativeScriptPickerModule { }

registerElement("PickerField", () => PickerField);
