import * as commonPicker from './picker.common';

export namespace knownTemplates {
    export let itemTemplate = "itemTemplate";
}

export class PickerTextField extends commonPicker.PickerTextField {
    initNativeView() {
        this.nativeTextViewProtected.setFocusable(false);
        this.nativeTextViewProtected.setLongClickable(false);
    }
}
