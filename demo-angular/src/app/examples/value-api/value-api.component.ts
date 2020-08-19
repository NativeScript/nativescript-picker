import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { PickerFieldComponent } from 'nativescript-picker/angular';
import { ObservableArray } from "@nativescript/core";
import { DataItem } from "../services/data-item";
import { DataItemService } from "../services/data-item.service";

@Component({
    selector: "ns-value-api-example",
    moduleId: module.id,
    styleUrls: ["value-api.component.css"],
    templateUrl: "./value-api.component.html"
})
export class ValueAPIExampleComponent implements OnInit {
    public pickerItems: ObservableArray<DataItem>;

    @ViewChild("myPicker", { static: false }) myPicker: PickerFieldComponent;

    constructor(private itemsService: DataItemService, private routerExtensions: RouterExtensions) {
        this.pickerItems = this.itemsService.getDataItems(20);
    }

    ngOnInit(): void { }

    public checkTap() {
        console.log("text: ", this.myPicker.nativeElement.text);
        console.log("selectedValue: ", this.myPicker.nativeElement.selectedValue);
        console.log("selectedIndex:", this.myPicker.nativeElement.selectedIndex);
        alert({
            title: "PickerField available APIs:",
            message: `text: ${this.myPicker.nativeElement.text}\n` + `selectedValue: ${this.myPicker.nativeElement.selectedValue}\n` + `selectedIndex: ${this.myPicker.nativeElement.selectedIndex}`,
            okButtonText: "OK"
        });
    }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
