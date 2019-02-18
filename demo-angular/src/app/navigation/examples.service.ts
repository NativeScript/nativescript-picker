import { Injectable } from "@angular/core";

import { ExampleItem } from "./example-item";

@Injectable({
    providedIn: "root"
})
export class ExamplesService {
    private items = new Array<ExampleItem>(
        { title: "Getting Started", route: "getting-started-example" },
        { title: "Styling", route: "styling-example" },
        { title: "Value APIs", route: "value-api-example" },
        { title: "Reactive forms", route: "reactive-forms-example" },
    );

    getExamples(): Array<ExampleItem> {
        return this.items;
    }
}
