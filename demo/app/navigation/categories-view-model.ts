import { Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { isAndroid } from "tns-core-modules/platform/platform";

export class NavigationItem {
    private _subItems: Array<NavigationItem>;
    private _title: string;
    private _module: string;
    private _parent: NavigationItem;

    constructor(title: string, module: string, parent: NavigationItem) {
        this._title = title;
        this._parent = parent;
        this._module = module;
        this._subItems = new Array<NavigationItem>();
    }

    get subItems(): Array<NavigationItem> {
        return this._subItems;
    }

    get title() {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get module() {
        return this._module;
    }

    set module(value: string) {
        this._module = value;
    }

    get parent() {
        return this._parent;
    }
}

export class NavigationViewModel extends Observable {

    private _lastTappedItem;
    private _currentSubItems: Array<NavigationItem>;
    private _currentNavItem: NavigationItem;
    private _hasBack: boolean;

    constructor() {
        super();
        this.currentParent = new NavigationItem("PickerField - Demo", undefined, undefined);
        this.buildComponentList();
        this.currentSubItems = this.currentParent.subItems;
        this.hasBackNavigation = false;
    }

    get currentSubItems(): Array<NavigationItem> {
        return this._currentSubItems;
    }

    set currentSubItems(value: Array<NavigationItem>) {
        this._currentSubItems = value;
    }

    get currentParent() {
        return this._currentNavItem;
    }

    set currentParent(value: NavigationItem) {
        this._currentNavItem = value;
    }

    get hasBackNavigation() {
        return this._hasBack;
    }

    set hasBackNavigation(value: boolean) {
        this._hasBack = value;
    }

    private buildComponentList() {
        const parent = this.currentParent;
        this.buildTextFieldPickerExamples(parent);
    }

    private buildTextFieldPickerExamples(currentParent: NavigationItem) {
        let exampleItem = new NavigationItem("Getting started", "examples/getting-started/getting-started-page", currentParent);
        currentParent.subItems.push(exampleItem);

        exampleItem = new NavigationItem("Styling", "examples/styling/styling-page", currentParent);
        currentParent.subItems.push(exampleItem);

        exampleItem = new NavigationItem("Value APIs", "examples/value-api/value-api-page", currentParent);
        currentParent.subItems.push(exampleItem);
    }

    public canMoveBack(): boolean {
        return this.hasBackNavigation;
    }

    public moveBack() {
        this.currentParent = this.currentParent.parent;
        this.hasBackNavigation = this.currentParent.parent !== undefined;
    }

    public initModelData() {
        if (this.currentParent && this.currentParent.module === undefined) {
            this.currentSubItems = this.currentParent.subItems;
        }
    }

    public onNavigationItemTap(args) {

        const itemIndex = args.index;
        const tappedItem = this.currentSubItems[itemIndex];

        if (!tappedItem) {
            return;
        }

        if (tappedItem.module === undefined) {
            this.hasBackNavigation = tappedItem.parent !== undefined;
            this.currentParent = tappedItem;
        }

        if (tappedItem.subItems.length > 0) {
            topmost().navigate({
                moduleName: "navigation/category-list-page"
            });
        } else {
            if (tappedItem.module) {
                topmost().navigate({
                    moduleName: tappedItem.module,
                    context: tappedItem
                });
            }
        }
    }
}

export const navigationModel = new NavigationViewModel();
