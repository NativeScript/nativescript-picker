import { Injectable } from "@angular/core";

import { ExampleItem } from "./example-item";

@Injectable({
    providedIn: "root"
})
export class ExamplesService {
    private items = new Array<ExampleItem>(
        { id: 1, title: "Getting Started", route: "getting-started-example" },
        { id: 1, title: "Styling", route: "styling-example" },
        { id: 1, title: "APIs", route: "value-api-example" },
    );

    getExamples(): Array<ExampleItem> {
        return this.items;
    }

    getExample(id: number): ExampleItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
