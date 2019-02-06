import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
import { PickerTextField } from 'nativescript-picker';

let thirdPicker: PickerTextField;

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
    thirdPicker = page.getViewById("thirdPicker");
}


export function checkTap(args) { 
    console.log("selectedValue", thirdPicker.selectedValue);
    console.log("selectedIndex", thirdPicker.selectedIndex);
}