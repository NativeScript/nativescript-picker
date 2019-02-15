import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { DataItem } from "../services/data-item";
import { DataItemService } from "../services/data-item.service";

@Component({
    selector: "ns-styling-example",
    moduleId: module.id,
    styleUrls: ["styling-example.component.css"],
    templateUrl: "./styling-example.component.html"
})
export class StylingExampleComponent implements OnInit {
    public pickerItems: ObservableArray<DataItem>;
    public pickerTitle = "Select item from list";

    constructor(private itemsService: DataItemService, private routerExtensions: RouterExtensions) { 
        this.pickerItems = this.itemsService.getDataItems(10);
    }

    ngOnInit(): void { }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
