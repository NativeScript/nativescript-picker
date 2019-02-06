import { Property, Template } from "tns-core-modules/ui/core/view";
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Button } from 'tns-core-modules/ui/button';
import { ListView } from "tns-core-modules/ui/list-view";
import { Page } from 'tns-core-modules/ui/page/page';
import { ChangedData } from "tns-core-modules/data/observable-array";

export interface ItemsSource {
    length: number;
    getItem(index: number): any;
}

/**
 * Represents an TextField component which opens a list in a modal window to provide a selection TextField's 'text'.
 */
export class PickerTextField extends TextField {
    values: any;
    pickerTitle: string;
    defaultSelectedIndex: number;
    maximumHeight: number;
    maximumWidth: number;
    items: any[] | ItemsSource;
    itemTemplate: string | Template;
    modalAnimated: boolean;
    textField: string;
    valueField: string;
    selectedValue: any;
    selectedIndex: number;
    closeButtonText: string;
    _modalListView: ListView;
    _closeButton: Button;
    _modalRoot: Page;
    private closeCallback;
    private _titleLabel;
    constructor();
    private createModalView;
    private initModalView;
    private getValueFromField;
    static modalAnimatedProperty: Property<PickerTextField, boolean>;
    static textFieldProperty: Property<PickerTextField, string>;
    static closeButtonTextProperty: Property<PickerTextField, string>;
    static pickerTitleProperty: Property<PickerTextField, string>;
    static itemTemplateProperty: Property<PickerTextField, string | Template>;
    static editableProperty: Property<PickerTextField, boolean>;
    static itemsProperty: Property<PickerTextField, any[] | ItemsSource>;
    _onItemsChanged(args: ChangedData<any>): void;
    private onTextFieldPropertyChanged;
    private onCloseButtonTextPropertyChanged;
    private onModalAnimatedPropertyChanged;
    private onPickerTitlePropertyChanged;
    private onItemTemplatePropertyChanged;
    private onEditablePropertyChanged;
    private getDataItem;
    private updateLabelVisibility;
    private updateListView;
    private updateCloseButton;
    protected onValuesChanged(oldValue: any, newValue: any): void;
    protected onModalAnimatedChanged(oldValue: boolean, newValue: boolean): void;
    protected onTextFieldChanged(oldValue: string, newValue: string): void;
    protected onCloseButtonTextChanged(oldValue: string, newValue: string): void;
    protected onPickerTitleChanged(oldValue: string, newValue: string): void;
    protected onItemTemplateChanged(oldValue: string | Template, newValue: string | Template): void;
    protected onEditableChanged(oldValue: boolean, newValue: boolean): void;
}
