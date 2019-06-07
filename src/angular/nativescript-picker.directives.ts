import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, IterableDiffers, AfterContentInit, OnDestroy } from "@angular/core";
import { TemplatedItemsComponent, TEMPLATED_ITEMS_COMPONENT } from "nativescript-angular/directives/templated-items-comp";
import { PickerField } from "../picker";
import { PickerValueAccessor } from "./nativescript-picker.accessors";
import { View } from "tns-core-modules/ui/core/view";

@Component({
    selector: "PickerField",
    template: `
        <DetachedContainer>
            <Placeholder #loader></Placeholder>
        </DetachedContainer>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TEMPLATED_ITEMS_COMPONENT, useExisting: forwardRef(() => PickerFieldComponent) }]
})
export class PickerFieldComponent extends TemplatedItemsComponent implements AfterContentInit {
    private _className: string;

    public get nativeElement(): PickerField {
        return this.templatedItemsView;
    }

    public get className(): string {
        return this._className;
    }

    protected templatedItemsView: PickerField;

    constructor(_elementRef: ElementRef,
        _iterableDiffers: IterableDiffers) {
        super(_elementRef, _iterableDiffers);
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
        this.nativeElement.on("classNameChange", this.onClassNameChange.bind(this));
    }

    ngOnDestroy() {
        if (this.nativeElement) {
            this.nativeElement.off("classNameChange", this.onClassNameChange.bind(this));
        }

        super.ngOnDestroy();
    }

    private onClassNameChange(args) {
        this. _className = (<View>args.object).className;
    }
}

export const DIRECTIVES = [PickerFieldComponent, PickerValueAccessor];