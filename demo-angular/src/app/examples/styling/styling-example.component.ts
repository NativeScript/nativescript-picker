import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { DataItemService } from "../services/data-item.service";
import { DataItem } from "../services/data-item";

@Component({
    selector: "ns-styling-example",
    moduleId: module.id,
    styleUrls: ["styling-example.component.css"],
    templateUrl: "./styling-example.component.html"
})
export class StylingExampleComponent implements OnInit {
    public pickerItems: ObservableArray<DataItem>;
    public pickerTitle = "Select item from list";
    

    constructor(private itemsService: DataItemService) { 
        this.pickerItems = this.itemsService.getDataItems(10);
    }

    ngOnInit(): void { }
}
