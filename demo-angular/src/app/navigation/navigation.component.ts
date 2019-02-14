import { Component, OnInit } from "@angular/core";

import { ExampleItem } from "./example-item";
import { ExamplesService } from "./examples.service";

@Component({
    selector: "ns-navigation",
    moduleId: module.id,
    templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements OnInit {
    items: Array<ExampleItem>;

    constructor(private itemService: ExamplesService) { }

    ngOnInit(): void {
        this.items = this.itemService.getExamples();
    }
}
