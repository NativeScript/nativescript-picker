var Picker = require("nativescript-picker").Picker;
var picker = new Picker();

describe("greet function", function() {
    it("exists", function() {
        expect(picker.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(picker.greet()).toEqual("Hello, NS");
    });
});