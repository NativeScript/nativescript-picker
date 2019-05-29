import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { GettingStartedModel } from './getting-started-model';

export function pageLoaded(args: observable.EventData) {
    let page = <pages.Page>args.object;
    page.bindingContext = new GettingStartedModel();
}

export function pickerOpened(args: observable.EventData) {
    console.log("Picker > Opened", (<any>args.object).className);
}

export function pickerClosed(args: observable.EventData) {
    console.log("Picker > Closed", (<any>args.object).className);
}