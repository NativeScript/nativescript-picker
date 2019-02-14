import { NgModule } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DIRECTIVES } from "./nativescript-picker.directives";
import { PickerTextField } from "../picker";

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
    providers: [
        ModalDialogService,
    ]
})
export class NativeScriptPickerModule { }

registerElement("PickerTextField", () => PickerTextField);