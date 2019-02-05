import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { Property, CssProperty, Template } from "tns-core-modules/ui/core/view";
import { booleanConverter } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";
import { Visibility } from "tns-core-modules/ui/styling/style-properties";
import { View, KeyedTemplate } from "tns-core-modules/ui/core/view";
import { ViewBase } from "tns-core-modules/ui/core/view-base";
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Button } from 'tns-core-modules/ui/button';

import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { Page, ShownModallyData, Color } from 'tns-core-modules/ui/page/page';
import { fromObject } from "tns-core-modules/data/observable";
import { ItemsSource } from ".";
import { addWeakEventListener, removeWeakEventListener } from "tns-core-modules/ui/core/weak-event-listener";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
import { GridLayout, GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';

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
	public displayMember: string;

	public _modalListView: ListView;
	public _closeButton: Button;
	public _modalRoot: GridLayout;

	private closeCallback;
	private _titleLabel: Label;

	constructor() {
		super();
		this.on(Button.tapEvent, (args: GestureEventData) => {
			this.createModalView();
			this.updateLabelVisibility();
			this.updateListView();

			const context = this;
			const callback = (sender: View, selectedIndex: number) => {
				let context;
				if (sender != undefined) {
					context = sender.bindingContext;
				}

				if (selectedIndex != undefined) {
					let object = this.getDataItem(selectedIndex);
					let newText = object;
					if (this.displayMember) {
						newText = object[this.displayMember];
					}
					
					this.text = newText;
				}
			};
			this.showModal(this._modalRoot, context, callback, true, this.modalAnimated);
		});
	}

	private createModalView() {
		this._modalRoot = new GridLayout();
		this._titleLabel = new Label();
		this._modalListView = new ListView();
		this._closeButton = new Button();
		this.initModalView();
	}

	private initModalView() {
		this._modalRoot.on(Page.shownModallyEvent, (args: ShownModallyData) => {
			const context = args.context;
			this.closeCallback = args.closeCallback;
			const page: Page = <Page>args.object;
			page.bindingContext = fromObject(context);
		});

		this._modalRoot.addRow(new ItemSpec(0, GridUnitType.AUTO));
		this._modalRoot.addRow(new ItemSpec(1, GridUnitType.STAR));
		this._modalRoot.addColumn(new ItemSpec(0, GridUnitType.AUTO));
		this._modalRoot.addColumn(new ItemSpec(1, GridUnitType.STAR));

		this._titleLabel.visibility = "collapse";
		GridLayout.setRow(this._titleLabel, 0);
		GridLayout.setColumn(this._titleLabel, 0);
		this._modalRoot.addChild(this._titleLabel);

		this._closeButton.text = "close";
		this._closeButton.backgroundColor = "white";
		this._closeButton.on(Button.tapEvent, (args: ItemEventData) => {
			this.closeCallback(undefined, undefined);
		});
		GridLayout.setRow(this._closeButton, 0);
		GridLayout.setColumn(this._closeButton, 1);
		this._modalRoot.addChild(this._closeButton);

		this._modalListView.separatorColor = new Color("transparent");
		this._modalListView.items = this.items;
		this._modalListView.on(ListView.itemTapEvent, (args: ItemEventData) => {
			this.closeCallback(args.view, args.index);
		});
		GridLayout.setRow(this._modalListView, 1);
		GridLayout.setColumn(this._modalListView, 0);
		GridLayout.setColumnSpan(this._modalListView, 2);

		this._modalRoot.addChild(this._modalListView);
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

	public static displayMemberProperty = new Property<PickerTextField, string>(
		{
			name: "displayMember",
			valueChanged: (target, oldValue, newValue) => {
				target.onDisplayMemberPropertyChanged(oldValue, newValue);
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

	
	private onDisplayMemberPropertyChanged(oldValue: string, newValue: string) {
		this.onDisplayMemberChanged(oldValue, newValue);
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

	private updateLabelVisibility() {
		if (this._titleLabel) {
			if (this._titleLabel) {
				this._titleLabel.text = this.pickerTitle;
			}

			if (this.pickerTitle != undefined || this.pickerTitle !== "") {
				this._titleLabel.visibility = "visible";
			} else {
				this._titleLabel.visibility = "collapse";
			}
		}
	}

	private updateListView() {
		if (this._modalListView && this.itemTemplate) {
			this._modalListView.itemTemplate = this.itemTemplate;
			this._modalListView.refresh();
		}
	}

	protected onValuesChanged(oldValue: any, newValue: any) { }

	protected onModalAnimatedChanged(oldValue: boolean, newValue: boolean) { }

	protected onDisplayMemberChanged(oldValue: string, newValue: string) { }

	protected onPickerTitleChanged(oldValue: string, newValue: string) {
		this.updateLabelVisibility();
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
PickerTextField.displayMemberProperty.register(PickerTextField);