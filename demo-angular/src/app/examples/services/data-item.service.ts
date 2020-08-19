import { Injectable } from "@angular/core";
import { ObservableArray } from "@nativescript/core";
import { DataItem } from "./data-item";

@Injectable({
    providedIn: "root"
})
export class DataItemService {
    private observableStringItems: ObservableArray<string>;
    private observableDataItems: ObservableArray<DataItem>;

    public getStringItems(size: number): ObservableArray<string> {
        this.observableStringItems = new ObservableArray();
        for (let i = 0; i < size; i++) {
            this.observableStringItems.push("Item " + i);
        }

        return this.observableStringItems;
    }

    public getStringItem(index: number): string {
        return this.observableStringItems.getItem(index);
    }

    public getDataItems(size: number): ObservableArray<DataItem> {
        this.observableDataItems = new ObservableArray<DataItem>();
        for (let i = 0; i < size; i++) {
            this.observableDataItems.push(new DataItem("Item " + i, i, "Description " + i, "https://picsum.photos/150/70/?random"));
        }

        return this.observableDataItems;
    }

    public getDataItemItem(index: number): DataItem {
        return this.observableDataItems.getItem(index);
    }
}
