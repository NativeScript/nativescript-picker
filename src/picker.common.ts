import { Observable } from 'tns-core-modules/data/observable';
import { Property, Template, booleanConverter } from "tns-core-modules/ui/core/view/view";
import { View, EventData } from "tns-core-modules/ui/core/view/view";
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Button } from 'tns-core-modules/ui/button/button';

import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ListView, ItemEventData, TemplatedItemsView } from "tns-core-modules/ui/list-view/list-view";
import { Page, ShownModallyData, Color } from 'tns-core-modules/ui/page';
import { fromObject } from "tns-core-modules/data/observable";
import { ItemsSource } from ".";
import { addWeakEventListener, removeWeakEventListener } from "tns-core-modules/ui/core/weak-event-listener";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array/observable-array";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { ActionItem } from 'tns-core-modules/ui/action-bar/action-bar';
import { Frame } from 'tns-core-modules/ui/frame/frame';

export namespace knownTemplates {
    export let itemTemplate = "itemTemplate";
}

export interface PickerField {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "itemLoading", callback: (args: ItemEventData) => void, thisArg?: any);
}

export class PickerField extends TextField implements TemplatedItemsView {

    public static itemLoadingEvent = "itemLoading";

    public pickerTitle: string;
    public items: any[] | ItemsSource;
    public itemTemplate: string | Template;
    public modalAnimated: boolean;
    public textField: string;
    public valueField: string;
    public selectedValue: any;
    public selectedIndex: number;
    public iOSCloseButtonPosition: "left" | "right";
    public iOSCloseButtonIcon: number;
    public androidCloseButtonPosition: "actionBar" | "actionBarIfRoom" | "popup";
    public androidCloseButtonIcon: string;
    private _modalListView: ListView;
    private _modalRoot: Frame;
    private _page: Page;
    private _modalGridLayout: GridLayout;
    private closeCallback;

    constructor() {
        super();
        this.on(Button.tapEvent, this.tapHandler.bind(this));
    }

    disposeNativeView() {
        this.off(Button.tapEvent, this.tapHandler);
        super.disposeNativeView();
    }

    private createModalView() {
        this._modalRoot = new Frame();
        this._page = new Page();
        this._modalListView = new ListView();
        this._modalGridLayout = new GridLayout();
        this.initModalView();
        this._page.content = this._modalGridLayout;
    }

    private disposeModalView() {
        if (this._modalRoot) {
            this.detachModalViewHandlers();
            this._modalRoot = undefined;
            this._page = undefined;
            this._modalListView = undefined;
            this._modalGridLayout = undefined;
        }
    }

    private initModalView() {
        if (this.pickerTitle && this.pickerTitle !== "") {
            this._page.actionBar.title = this.pickerTitle;
        } else {
            this._modalRoot.actionBarVisibility = "always";
            this._page.actionBar.title = "";
        }

        this.applyCssScope(this._page.actionBar);

        let actionItem = new ActionItem();
        actionItem.text = "Close";
        actionItem.on(Button.tapEvent, (args: ItemEventData) => {
            this.closeCallback(undefined, undefined);
        });

        if (actionItem.ios) {
            actionItem.ios.position = this.iOSCloseButtonPosition;
            actionItem.ios.systemIcon = this.iOSCloseButtonIcon;
        }

        if (actionItem.android) {
            actionItem.android.systemIcon = this.androidCloseButtonIcon;
            actionItem.android.position = this.androidCloseButtonPosition;
        }

        this._page.actionBar.actionItems.addItem(actionItem);

        this._modalRoot.on(Page.shownModallyEvent, this.shownModallyHandler.bind(this));

        this._modalListView.on(ListView.itemLoadingEvent, this.listViewItemLoadingHandler.bind(this));
        this._modalListView.on(ListView.itemTapEvent, this.listViewItemTapHandler.bind(this));
        this.applyCssScope(this._modalListView);
        this._modalListView.items = this.items;

        (<any>this._modalGridLayout).addChild(this._modalListView);
    }

    private applyCssScope(view: View) {
        const ngKey = Object.keys(this).find(key => key.startsWith('_ngcontent'));
        const vueKey = Object.keys(this).find(key => key.startsWith('data-v'));
        if (ngKey) {
            view[ngKey] = this[ngKey];
        }

        if (vueKey) {
            view[vueKey] = this[vueKey];
        }

        if (this.className) {
            let classNames = this.className.split(' ');
            classNames.forEach(element => {
                view.cssClasses.add(element);
            });
        }
    }

    private detachModalViewHandlers() {
        this._modalRoot.off(Page.shownModallyEvent, this.shownModallyHandler.bind(this));
        this._modalListView.off(ListView.itemTapEvent, this.listViewItemTapHandler.bind(this));
        this._modalListView.off(ListView.itemLoadingEvent, this.listViewItemLoadingHandler.bind(this));
    }

    private shownModallyHandler(args: ShownModallyData) {
        const context = args.context;
        this.closeCallback = args.closeCallback;
        const page: Page = <Page>args.object;
        page.bindingContext = fromObject(context);
    }

    private tapHandler(args: GestureEventData) {
        this.createModalView();
        this.updateListView();
        this.updateActionBarTitle();

        const context = this;
        const callback = (sender: View, selectedIndex: number) => {
            if (selectedIndex !== undefined) {
                let object = this.getDataItem(selectedIndex);
                this.selectedIndex = selectedIndex;
                let value = this.getValueFromField("valueField", this.valueField, object);
                this.selectedValue = value === undefined ? object : value;
            }

            this.disposeModalView();
        };
        this._modalRoot.navigate(() => this._page);
        this.showModal(this._modalRoot, context, callback, true, this.modalAnimated);
    }

    private listViewItemTapHandler(args: ItemEventData) {
        this.closeCallback(args.view, args.index);
    }

    private listViewItemLoadingHandler(args: ItemEventData) {
        return this.notify(args);
    }

    private getValueFromField(manipulatedProperty: string, propertyName: string, object: any): string {
        if (!propertyName) {
            return undefined;
        }

        if (object.hasOwnProperty(propertyName)) {
            return object[propertyName];
        }

        console.log(`Warning: Cannot update the '${manipulatedProperty}' property of PickerField. The '${propertyName}' property not found on the objects in the 'items' collection.`);
        return undefined;
    }

    public static modalAnimatedProperty = new Property<PickerField, boolean>(
        {
            name: "modalAnimated",
            defaultValue: true,
            valueConverter: booleanConverter,
            valueChanged: PickerField.modalAnimatedChanged
        });

    private static modalAnimatedChanged(target: PickerField, oldValue, newValue) {
        target.onModalAnimatedPropertyChanged(oldValue, newValue);
    }

    public static selectedValueProperty = new Property<PickerField, any>(
        {
            name: "selectedValue",
            valueChanged: PickerField.selectedValueChanged
        });

    private static selectedValueChanged(target: PickerField, oldValue, newValue) {
        target.onSelectedValuePropertyChanged(oldValue, newValue);
    }

    public static valueFieldProperty = new Property<PickerField, string>(
        {
            name: "valueField",
            valueChanged: PickerField.valueFieldChanged
        });

    private static valueFieldChanged(target: PickerField, oldValue, newValue) {
        target.onValueFieldPropertyChanged(oldValue, newValue);
    }


    public static textFieldProperty = new Property<PickerField, string>(
        {
            name: "textField",
            valueChanged: PickerField.textFieldChanged
        });

    private static textFieldChanged(target: PickerField, oldValue, newValue) {
        target.onTextFieldPropertyChanged(oldValue, newValue);
    }

    public static iOSCloseButtonPositionProperty = new Property<PickerField, "left" | "right">(
        {
            name: "iOSCloseButtonPosition",
            defaultValue: "right",
            valueChanged: PickerField.iOSCloseButtonPositionChanged
        });

    private static iOSCloseButtonPositionChanged(target: PickerField, oldValue, newValue) {
        target.onIOSCloseButtonPositionPropertyChanged(oldValue, newValue);
    }

    public static iOSCloseButtonIconProperty = new Property<PickerField, number>(
        {
            name: "iOSCloseButtonIcon",
            defaultValue: 1,
            valueChanged: PickerField.iOSCloseButtonIconChanged
        });

    private static iOSCloseButtonIconChanged(target: PickerField, oldValue, newValue) {
        target.onIOSCloseButtonIconPropertyChanged(oldValue, newValue);
    }

    public static androidCloseButtonPositionProperty = new Property<PickerField, "actionBar" | "actionBarIfRoom" | "popup">(
        {
            name: "androidCloseButtonPosition",
            defaultValue: "actionBar",
            valueChanged: PickerField.androidCloseButtonPositionChanged
        });

    private static androidCloseButtonPositionChanged(target: PickerField, oldValue, newValue) {
        target.onAndroidCloseButtonPositionPropertyChanged(oldValue, newValue);
    }

    public static androidCloseButtonIconProperty = new Property<PickerField, string>(
        {
            name: "androidCloseButtonIcon",
            defaultValue: "ic_menu_close_clear_cancel",
            valueChanged: PickerField.androidCloseButtonIconChanged
        });

    private static androidCloseButtonIconChanged(target: PickerField, oldValue, newValue) {
        target.onAndroidCloseButtonIconPropertyChanged(oldValue, newValue);
    }

    public static pickerTitleProperty = new Property<PickerField, string>(
        {
            name: "pickerTitle",
            defaultValue: undefined,
            valueChanged: PickerField.pickerTitleChanged
        });

    private static pickerTitleChanged(target: PickerField, oldValue, newValue) {
        target.onPickerTitlePropertyChanged(oldValue, newValue);
    }

    public static itemTemplateProperty = new Property<PickerField, string | Template>(
        {
            name: "itemTemplate",
            defaultValue: undefined,
            valueChanged: PickerField.itemTemplateChanged
        });

    private static itemTemplateChanged(target: PickerField, oldValue, newValue) {
        target.onItemTemplatePropertyChanged(oldValue, newValue);
    }

    public static editableProperty = new Property<PickerField, boolean>(
        {
            name: "editable",
            defaultValue: false,
            valueConverter: booleanConverter,
            valueChanged: PickerField.editableChanged
        });

    private static editableChanged(target: PickerField, oldValue, newValue) {
        target.onEditablePropertyChanged(oldValue, newValue);
    }

    public static itemsProperty = new Property<PickerField, any[] | ItemsSource>({
        name: "items",
        valueChanged: PickerField.itemsChanged
    });

    private static itemsChanged(target: PickerField, oldValue, newValue) {
        if (target && target._modalListView) {
            target._modalListView.items = newValue;
        }

        if (oldValue instanceof Observable) {
            removeWeakEventListener(oldValue, ObservableArray.changeEvent, target.onItemsChanged, target);
        }

        if (newValue instanceof Observable) {
            addWeakEventListener(newValue, ObservableArray.changeEvent, target.onItemsChanged, target);
        }

        if (target && target._modalListView) {
            target._modalListView.refresh();
        }
    }

    private onItemsChanged(args: ChangedData<any>) {
        this.refresh();
    }

    private onSelectedValuePropertyChanged(oldValue: any, newValue: any) {
        this.onSelectedValueChanged(oldValue, newValue);
    }

    private onValueFieldPropertyChanged(oldValue: string, newValue: string) {
        this.onValueFieldChanged(oldValue, newValue);
    }

    private onTextFieldPropertyChanged(oldValue: string, newValue: string) {
        this.onTextFieldChanged(oldValue, newValue);
    }

    private onIOSCloseButtonPositionPropertyChanged(oldValue: "left" | "right", newValue: "left" | "right") {
        this.onIOSCloseButtonPositionChanged(oldValue, newValue);
    }

    private onIOSCloseButtonIconPropertyChanged(oldValue: number, newValue: number) {
        this.onIOSCloseButtonIconChanged(oldValue, newValue);
    }

    private onAndroidCloseButtonPositionPropertyChanged(oldValue: "actionBar" | "actionBarIfRoom" | "popup", newValue: "actionBar" | "actionBarIfRoom" | "popup") {
        this.onAndroidCloseButtonPositionChanged(oldValue, newValue);
    }

    private onAndroidCloseButtonIconPropertyChanged(oldValue: string, newValue: string) {
        this.onAndroidCloseButtonIconChanged(oldValue, newValue);
    }

    private onModalAnimatedPropertyChanged(oldValue: boolean, newValue: boolean) {
        this.onModalAnimatedChanged(oldValue, newValue);
    }

    private onPickerTitlePropertyChanged(oldValue: any, newValue: any) {
        this.onPickerTitleChanged(oldValue, newValue);
    }

    private onItemTemplatePropertyChanged(oldValue: string | Template, newValue: string | Template) {
        this.onItemTemplateChanged(oldValue, newValue);
    }

    private onEditablePropertyChanged(oldValue: boolean, newValue: boolean) {
        this.onEditableChanged(oldValue, newValue);
    }

    private getDataItem(index: number): any {
        let thisItems = <ItemsSource>this.items;
        return thisItems.getItem ? thisItems.getItem(index) : thisItems[index];
    }

    private updateListView() {
        if (this._modalListView && this.itemTemplate) {
            this._modalListView.itemTemplate = this.itemTemplate;
            this._modalListView.refresh();
        }
    }

    private updateActionBarTitle() {
        if (this._page && this._page.actionBar) {
            if (this.pickerTitle && this.pickerTitle !== "") {
                this._page.actionBar.title = this.pickerTitle;
            } else {
                this._modalRoot.actionBarVisibility = "always";
                this._page.actionBar.title = "";
            }
        }
    }

    public refresh() {
        if (this._modalListView) {
            this._modalListView.refresh();
        }
    }

    protected onModalAnimatedChanged(oldValue: boolean, newValue: boolean) { }

    protected onSelectedValueChanged(oldValue: any, newValue: any) {
        let textValue = this.getValueFromField("textField", this.textField, newValue);
        textValue = textValue === undefined ? newValue : textValue;
        this.text = textValue;
    }

    protected onValueFieldChanged(oldValue: string, newValue: string) { }

    protected onTextFieldChanged(oldValue: string, newValue: string) { }

    protected onIOSCloseButtonPositionChanged(oldValue: "left" | "right", newValue: "left" | "right") { }

    protected onIOSCloseButtonIconChanged(oldValue: number, newValue: number) { }

    protected onAndroidCloseButtonPositionChanged(oldValue: "actionBar" | "actionBarIfRoom" | "popup", newValue: "actionBar" | "actionBarIfRoom" | "popup") { }

    protected onAndroidCloseButtonIconChanged(oldValue: string, newValue: string) { }

    protected onPickerTitleChanged(oldValue: string, newValue: string) {
        this.updateActionBarTitle();
    }

    protected onItemTemplateChanged(oldValue: string | Template, newValue: string | Template) {
        this.updateListView();
    }

    protected onEditableChanged(oldValue: boolean, newValue: boolean) {
        if (newValue) {
            console.log("PickerField does not support 'editable = true'");
        }
        this.editable = false;
    }
}

PickerField.modalAnimatedProperty.register(PickerField);
PickerField.pickerTitleProperty.register(PickerField);
PickerField.itemTemplateProperty.register(PickerField);
PickerField.editableProperty.register(PickerField);
PickerField.itemsProperty.register(PickerField);
PickerField.textFieldProperty.register(PickerField);
PickerField.valueFieldProperty.register(PickerField);
PickerField.selectedValueProperty.register(PickerField);
PickerField.iOSCloseButtonPositionProperty.register(PickerField);
PickerField.iOSCloseButtonIconProperty.register(PickerField);
PickerField.androidCloseButtonPositionProperty.register(PickerField);
PickerField.androidCloseButtonIconProperty.register(PickerField);
