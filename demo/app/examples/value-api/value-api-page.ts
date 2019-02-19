import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { ValueApiModel } from './value-api-model';
import { PickerField } from 'nativescript-picker';
import { alert } from "tns-core-modules/ui/dialogs";

let myPicker: PickerField;

export function pageLoaded(args: observable.EventData) {
    let page = <pages.Page>args.object;
    page.bindingContext = new ValueApiModel();
    myPicker = page.getViewById("myPicker");
}


export function checkTap(args) {
    console.log("text: ", myPicker.text);
    console.log("selectedValue: ", myPicker.selectedValue);
    console.log("selectedIndex:", myPicker.selectedIndex);
    alert({
        title: "PickerField available APIs:",
        message: `text: ${myPicker.text}\n` + `selectedValue: ${myPicker.selectedValue}\n` + `selectedIndex: ${myPicker.selectedIndex}`,
        okButtonText: "OK"
    });
}