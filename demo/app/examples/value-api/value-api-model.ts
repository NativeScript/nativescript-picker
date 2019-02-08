import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class ValueApiModel extends Observable {
	public pickerItems: ObservableArray<DataItem>;

	constructor() {
		super();

		this.pickerItems = this.getItems(20);
	}

	private getItems(size: number) {
		let array = new ObservableArray<DataItem>();
		
		for(let i = 0; i < size; i++) {
			array.push(new DataItem("Item " + i, i, "Description " + i));
		}

		return array;
	}
}

class DataItem {
	constructor (public name: string, public id: number, public description: string) { }
}
