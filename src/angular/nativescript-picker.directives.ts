import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, IterableDiffers } from "@angular/core";
import { TemplatedItemsComponent, TEMPLATED_ITEMS_COMPONENT } from "nativescript-angular/directives/templated-items-comp";
import { PickerTextField } from "../picker";
import { PickerValueAccessor } from "./nativescript-picker.accessors";

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