import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class GettingStartedModel extends Observable {
    public pickerItems: ObservableArray<string>;

    constructor() {
        super();

        this.pickerItems = this.getItems(100);
    }

    private getItems(size: number) {
        let array = new ObservableArray<string>();

        for (let i = 0; i < size; i++) {
            array.push("Item " + i);
        }

        return array;
    }
}
