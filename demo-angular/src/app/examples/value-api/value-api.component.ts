import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { DataItemService } from "../services/data-item.service";
import { DataItem } from "../services/data-item";
import { PickerTextFieldComponent } from 'nativescript-picker/angular';

@Component({
    selector: "ns-value-api-example",
    moduleId: module.id,
    styleUrls: ["value-api.component.css"],
    templateUrl: "./value-api.component.html"
})
export class ValueAPIExampleComponent implements OnInit {
    public pickerItems: ObservableArray<DataItem>;

    @ViewChild("myPicker") myPicker: PickerTextFieldComponent;

    constructor(private itemsService: DataItemService) {
        this.pickerItems = this.itemsService.getDataItems(20);
    }

    ngOnInit(): void { }

    public checkTap(args) {
        console.log("text: ", this.myPicker.nativeElement.text);
        console.log("selectedValue: ", this.myPicker.nativeElement.selectedValue);
        console.log("selectedIndex:", this.myPicker.nativeElement.selectedIndex);
        alert({
            title: "PickerTextField available APIs:",
            message: `text: ${this.myPicker.nativeElement.text}\n` + `selectedValue: ${this.myPicker.nativeElement.selectedValue}\n` + `selectedIndex: ${this.myPicker.nativeElement.selectedIndex}`,
            okButtonText: "OK"
        });
    }
}
