import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DIRECTIVES } from "./nativescript-picker.directives";
import { PickerField } from "../picker";

@NgModule({
    declarations: [DIRECTIVES],
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