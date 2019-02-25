import { PickerField } from "../picker";

const Picker = {
    install(Vue) {
        Vue.registerElement(
            'PickerField',
            () => PickerField,
            {
                model: {
                    prop: 'selectedValue',
                    event: 'selectedValueChange'
                }
            }
        );
    }
};
export default Picker;