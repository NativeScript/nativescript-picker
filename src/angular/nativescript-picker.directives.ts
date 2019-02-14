import {
    ChangeDetectionStrategy,
    ContentChild,
    Component,
    ElementRef,
    forwardRef,
    IterableDiffers,
    TemplateRef,
    ViewContainerRef,
} from "@angular/core";
import { PickerValueAccessor } from "./nativescript-picker.accessors";
import { ItemContext } from "nativescript-angular/directives/templated-items-comp";
import { PickerTextField } from "../picker";
import { TemplatedItemsComponent, TEMPLATED_ITEMS_COMPONENT } from "nativescript-angular/directives/templated-items-comp";

@Component({
    selector: "PickerTextField",
    template: `
        <DetachedContainer>
            <Placeholder #loader></Placeholder>
        </DetachedContainer>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TEMPLATED_ITEMS_COMPONENT, useExisting: forwardRef(() => PickerTextFieldComponent) }]
})
export class PickerTextFieldComponent extends TemplatedItemsComponent {
    public get nativeElement(): PickerTextField {
        return this.templatedItemsView;
    }

    protected templatedItemsView: PickerTextField;

    constructor(_elementRef: ElementRef,
        _iterableDiffers: IterableDiffers) {
        super(_elementRef, _iterableDiffers);
    }
}

export const DIRECTIVES = [PickerTextFieldComponent, PickerValueAccessor];