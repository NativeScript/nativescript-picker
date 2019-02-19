import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, IterableDiffers } from "@angular/core";
import { TemplatedItemsComponent, TEMPLATED_ITEMS_COMPONENT } from "nativescript-angular/directives/templated-items-comp";
import { PickerField } from "../picker";
import { PickerValueAccessor } from "./nativescript-picker.accessors";

@Component({
    selector: "PickerField",
    template: `
        <DetachedContainer>
            <Placeholder #loader></Placeholder>
        </DetachedContainer>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TEMPLATED_ITEMS_COMPONENT, useExisting: forwardRef(() => PickerFieldComponent) }]
})
export class PickerFieldComponent extends TemplatedItemsComponent {
    public get nativeElement(): PickerField {
        return this.templatedItemsView;
    }

    protected templatedItemsView: PickerField;

    constructor(_elementRef: ElementRef,
        _iterableDiffers: IterableDiffers) {
        super(_elementRef, _iterableDiffers);
    }
}

export const DIRECTIVES = [PickerFieldComponent, PickerValueAccessor];