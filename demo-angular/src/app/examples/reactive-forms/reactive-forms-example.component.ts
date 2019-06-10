import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { PickerFieldComponent } from "nativescript-picker/angular";
import { EventData } from "tns-core-modules/ui/core/view/view";
import { View } from "tns-core-modules/ui/core/view";

@Component({
    selector: "ns-reactive-forms-example",
    moduleId: module.id,
    styleUrls: ["reactive-forms-example.component.css"],
    templateUrl: "./reactive-forms-example.component.html"
})
export class ReactiveFormsExampleComponent {
    public pickerItems: ObservableArray<Movie>;
    @ViewChild("picker", { static: false }) pickerComp: PickerFieldComponent;

    constructor(private routerExtensions: RouterExtensions, private fb: FormBuilder) {
        this.pickerItems = new ObservableArray([
            new Movie("The Godfather", 1, 1972, "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"),
            new Movie("The Shawshank Redemption", 2, 1994, "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("Schindler's List", 3, 1993, "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("Raging Bull ", 4, 1980, "https://m.media-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("Citizen Kane", 6, 1941, "https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("Gone with the Wind", 7, 1939, "https://m.media-amazon.com/images/M/MV5BYjUyZWZkM2UtMzYxYy00ZmQ3LWFmZTQtOGE2YjBkNjA3YWZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("The Wizard of Oz", 8, 1939, "https://m.media-amazon.com/images/M/MV5BNjUyMTc4MDExMV5BMl5BanBnXkFtZTgwNDg0NDIwMjE@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie("One Flew Over the Cuckoo's Nest", 9, 1975, "https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"),
            new Movie(" Lawrence of Arabia", 10, 1962, "https://m.media-amazon.com/images/M/MV5BYWY5ZjhjNGYtZmI2Ny00ODM0LWFkNzgtZmI1YzA2N2MxMzA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UY268_CR2,0,182,268_AL_.jpg"),
        ]);

        this.movieForm = new FormGroup({
            movie: new FormControl(undefined),
        });
    }

    public movieForm: FormGroup;

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    public onSubmit() {
        let formMovieValue = this.movieForm.get("movie").value;
        let selectedValue = this.pickerComp.nativeElement.selectedValue;
        console.log("picker selected value: ", selectedValue);
        console.log("Forms 'movie' value: ", formMovieValue);
        alert({
            title: "Forms 'movie' value:",
            message: `Forms 'movie' value:  ${formMovieValue}`,
            okButtonText: "OK"
        });
    }

    public pickerOpened(args: EventData) {
        console.log("Picker > Opened; class:", (<View>args.object).className);
    }

    public pickerClosed(args: EventData) {
        console.log("Picker > Closed; class:", (<View>args.object).className);
    }
}

class Movie {
    constructor(public name: string, public id: number, public year: number, public imageUrl: string) { }
}
