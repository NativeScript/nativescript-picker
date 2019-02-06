import { Observable } from 'tns-core-modules/data/observable';
import { PickerTextField } from 'nativescript-picker';
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class HelloWorldModel extends Observable {
	public message: string;
	private picker: PickerTextField;
	public myItems1: string[];
	public observableArray: ObservableArray<{ name: string, id: number}>;
	public thirdTitle = "Title from binding";
	public fontCross: string;

	constructor() {
		super();
		this.fontCross = String.fromCharCode(0xe870);
		this.myItems1 = ["item 1", "Item 2", "item 3"];
		this.observableArray = new ObservableArray([{ name: "Item 4", id: 4 }, { name: "Item 5", id: 5 }, { name: "Item 6", id: 6 }]);
		this.observableArray.push({ name: "Item 8", id: 8 });

		this.picker = new PickerTextField();
	}
}
