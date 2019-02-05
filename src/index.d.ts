import { View, Property } from "tns-core-modules/ui/core/view";

// TODO: add comments
export declare class PickerTextField extends View {
    static isReadOnlyProperty: Property<PickerTextField, boolean>;
    static valuesProperty: Property<PickerTextField, any>;
    private onIsReadOnlyPropertyChanged(oldValue, newValue);
    private onValuesPropertyChanged(oldValue, newValue);
    protected onValuesChanged(oldValue: any, newValue: any): void;
    protected onIsReadOnlyChanged(oldValue: boolean, newValue: boolean): void;
}

export interface ItemsSource {
    length: number;
    getItem(index: number): any;
}
