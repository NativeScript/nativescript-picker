import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class StylingModel extends Observable {
    public pickerItems: ObservableArray<DataItem>;
    public pickerTitle = "Select item from list";

    constructor() {
        super();

        this.pickerItems = this.getItems(20);
    }

    private getItems(size: number) {
        let array = new ObservableArray<DataItem>();

        for (let i = 0; i < size; i++) {
            array.push(new DataItem("Item " + i, i, "https://picsum.photos/150/70/?random"));
        }

        return array;
    }
}

class DataItem {
    constructor(public name: string, public id: number, public imageUrl: string) { }
}
