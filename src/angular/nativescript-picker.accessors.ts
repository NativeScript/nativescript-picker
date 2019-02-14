import { Directive, ElementRef, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseValueAccessor } from "nativescript-angular/forms/value-accessors";
import { PickerTextField } from "../picker";

const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PickerValueAccessor),
    multi: true,
};

/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <PickerTextField [(ngModel)]="model.test">
 *  ```
 */
@Directive({
    selector: "PickerTextField[ngModel],PickerTextField[formControlName],PickerTextField[formControl]," +
        "pickerTextField[ngModel],pickerTextField[formControlName],pickerTextField[formControl]," +
        "pickerTextField[ngModel],pickerTextField[formControlName],pickerTextField[formControl]," +
        "picker-text-field[ngModel],picker-text-field[formControlName],picker-text-field[formControl]",
    providers: [PICKER_VALUE_ACCESSOR],
    host: {
        "(dateChange)": "onChange($event.value)",
    },
})
export class PickerValueAccessor extends BaseValueAccessor<PickerTextField> {
    constructor(elementRef: ElementRef) {
        super(elementRef.nativeElement);
    }

    writeValue(value: any): void {
        // TODO see how if parsing hte object is required
        const normalized = super.normalizeValue(value);
        this.view.selectedValue = normalized;
    }
}
