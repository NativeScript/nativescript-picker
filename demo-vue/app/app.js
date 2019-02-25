import Vue from "nativescript-vue";

import Home from "./components/Home";

import PickerField from "nativescript-picker/vue";
Vue.use(PickerField);

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
