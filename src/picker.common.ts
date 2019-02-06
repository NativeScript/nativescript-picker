import { Observable } from 'tns-core-modules/data/observable';
import { Property, Template, booleanConverter } from "tns-core-modules/ui/core/view/view";
import { Label } from "tns-core-modules/ui/label/label";
import { View } from "tns-core-modules/ui/core/view/view";
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Button } from 'tns-core-modules/ui/button/button';

import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { Page, ShownModallyData, Color } from 'tns-core-modules/ui/page';
import { fromObject } from "tns-core-modules/data/observable";
import { ItemsSource } from ".";
import { addWeakEventListener, removeWeakEventListener } from "tns-core-modules/ui/core/weak-event-listener";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array/observable-array";
import { GridLayout, GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { ActionItem } from 'tns-core-modules/ui/action-bar/action-bar';
import { Frame } from 'tns-core-modules/ui/frame/frame';

export namespace knownTemplates {
	export let itemTemplate = "itemTemplate";
}

export class PickerTextField extends TextField {

	public values: any;
	public pickerTitle: string;
	public defaultSelectedIndex: number;
	public maximumHeight: number;
	public maximumWidth: number;
	public items: any[] | ItemsSource;
	public itemTemplate: string | Template;
	public modalAnimated: boolean;
	public textField: string;
	public valueField: string;
	public selectedValue: any;
	public selectedIndex: number;
	public closeButtonText: string;

	public _modalListView: ListView;
	public _modalRoot: Frame;
	public _page: Page;
	private _modalGridLayout: GridLayout;

	private closeCallback;

	constructor() {
		super();
		this.on(Button.tapEvent, (args: GestureEventData) => {
			this.createModalView();
			this.updateListView();
			this.updateActionBarTitle();

			const context = this;
			const callback = (sender: View, selectedIndex: number) => {
				if (selectedIndex != undefined) {
					let object = this.getDataItem(selectedIndex);
					this.selectedIndex = selectedIndex;
					let value = this.getValueFromField("valueField", this.valueField, object);
					this.selectedValue = value ? value : object;
					let textValue = this.getValueFromField("textField", this.textField, object);
					this.text = textValue ? textValue : object;
				}
			};
			this._modalRoot.navigate(() => this._page);
			this.showModal(this._modalRoot, context, callback, true, this.modalAnimated);
		});
	}

	private createModalView() {
		this._modalRoot = new Frame();
		this._page = new Page();
		this._modalListView = new ListView();
		this._modalGridLayout = new GridLayout();
		this.initModalView();
		this._page.content = this._modalGridLayout;
	}

	private initModalView() {
		if (this.pickerTitle && this.pickerTitle !== "") {
			this._page.actionBar.title = this.pickerTitle;
		} else {
			this._modalRoot.actionBarVisibility = "always";
			this._page.actionBar.title = "";
		}
		let actionItem = new ActionItem();
		actionItem.on(Button.tapEvent, (args: ItemEventData) => {
			this.closeCallback(undefined, undefined);
		});
		if (actionItem.ios) {
			actionItem.ios.systemIcon = 1;
			actionItem.ios.position = "right";
		}

		if (actionItem.android) {
			actionItem.android.systemIcon = "ic_menu_close_clear_cancel";
		}

		this._page.actionBar.actionItems.addItem(actionItem);

		this._modalRoot.on(Page.shownModallyEvent, (args: ShownModallyData) => {
			const context = args.context;
			this.closeCallback = args.closeCallback;
			const page: Page = <Page>args.object;
			page.bindingContext = fromObject(context);
		});

		this._modalListView.separatorColor = new Color("transparent");
		this._modalListView.items = this.items;
		this._modalListView.on(ListView.itemTapEvent, (args: ItemEventData) => {
			this.closeCallback(args.view, args.index);
		});
		GridLayout.setRow(this._modalListView, 1);
		GridLayout.setColumn(this._modalListView, 0);
		GridLayout.setColumnSpan(this._modalListView, 2);

		(<any>this._modalGridLayout).addChild(this._modalListView);
	}

	private getValueFromField(manipulatedProperty: string, propertyName: string, object: any): string {
		if (!propertyName) {
			return undefined;
		}

		if (object.hasOwnProperty(propertyName)) {
			return object[propertyName];
		}

		console.log(`Warning: Cannot update the '${manipulatedProperty}' property of PickerTextField. The '${propertyName}' property not found on the objects in the 'items' collection.`);
		return undefined;
	}

	public static modalAnimatedProperty = new Property<PickerTextField, boolean>(
		{
			name: "modalAnimated",
			defaultValue: true,
			valueConverter: booleanConverter,
			valueChanged: (target, oldValue, newValue) => {
				target.onModalAnimatedPropertyChanged(oldValue, newValue);
			},
		});

	public static textFieldProperty = new Property<PickerTextField, string>(
		{
			name: "textField",
			valueChanged: (target, oldValue, newValue) => {
				target.onTextFieldPropertyChanged(oldValue, newValue);
			},
		});

	public static closeButtonTextProperty = new Property<PickerTextField, string>(
		{
			name: "closeButtonText",
			valueChanged: (target, oldValue, newValue) => {
				target.onCloseButtonTextPropertyChanged(oldValue, newValue);
			},
		});

	public static pickerTitleProperty = new Property<PickerTextField, string>(
		{
			name: "pickerTitle",
			defaultValue: undefined,
			valueChanged: (target, oldValue, newValue) => {
				target.onPickerTitlePropertyChanged(oldValue, newValue);
			},
		});

	public static itemTemplateProperty = new Property<PickerTextField, string | Template>(
		{
			name: "itemTemplate",
			defaultValue: undefined,
			valueChanged: (target, oldValue, newValue) => {
				target.onItemTemplatePropertyChanged(oldValue, newValue);
			},
		});

	public static editableProperty = new Property<PickerTextField, boolean>(
		{
			name: "editable",
			defaultValue: false,
			valueConverter: booleanConverter,
			valueChanged: (target, oldValue, newValue) => {
				target.onEditablePropertyChanged(oldValue, newValue);
			},
		});

	public static itemsProperty = new Property<PickerTextField, any[] | ItemsSource>({
		name: "items", valueChanged: (target, oldValue, newValue) => {
			if (target && target._modalListView) {
				target._modalListView.items = newValue;
			}

			if (oldValue instanceof Observable) {
				removeWeakEventListener(oldValue, ObservableArray.changeEvent, target._onItemsChanged, target);
			}

			if (newValue instanceof Observable) {
				addWeakEventListener(newValue, ObservableArray.changeEvent, target._onItemsChanged, target);
			}

			if (target && target._modalListView) {
				target._modalListView.refresh();
			}
		}
	});

	public _onItemsChanged(args: ChangedData<any>) {
		if (this._modalListView) {
			this._modalListView.refresh();
		}
	}

	private onTextFieldPropertyChanged(oldValue: string, newValue: string) {
		this.onTextFieldChanged(oldValue, newValue);
	}

	private onCloseButtonTextPropertyChanged(oldValue: string, newValue: string) {
		this.onCloseButtonTextChanged(oldValue, newValue);
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

	protected onValuesChanged(oldValue: any, newValue: any) { }

	protected onModalAnimatedChanged(oldValue: boolean, newValue: boolean) { }

	protected onTextFieldChanged(oldValue: string, newValue: string) { }

	protected onCloseButtonTextChanged(oldValue: string, newValue: string) { }

	protected onPickerTitleChanged(oldValue: string, newValue: string) {
		this.updateActionBarTitle();
	}

	protected onItemTemplateChanged(oldValue: string | Template, newValue: string | Template) {
		this.updateListView();
	}

	protected onEditableChanged(oldValue: boolean, newValue: boolean) {
		if (newValue) {
			console.log("PickerTextField does not support 'editable = true'");
		}
		this.editable = false;
	}
}

PickerTextField.modalAnimatedProperty.register(PickerTextField);
PickerTextField.pickerTitleProperty.register(PickerTextField);
PickerTextField.itemTemplateProperty.register(PickerTextField);
PickerTextField.editableProperty.register(PickerTextField);
PickerTextField.itemsProperty.register(PickerTextField);
PickerTextField.textFieldProperty.register(PickerTextField);
PickerTextField.closeButtonTextProperty.register(PickerTextField);
