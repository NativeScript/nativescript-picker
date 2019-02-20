import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { DataItemService } from "../services/data-item.service";

@Component({
    selector: "ns-getting-started-example",
    moduleId: module.id,
    styleUrls: ["getting-started-example.component.css"],
    templateUrl: "./getting-started-example.component.html"
})
export class GettingStartedExampleComponent implements OnInit {
    public pickerItems: ObservableArray<string>;

    constructor(private itemsService: DataItemService, private routerExtensions: RouterExtensions) {
        this.pickerItems = this.itemsService.getStringItems(100);
    }

    ngOnInit(): void { }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
