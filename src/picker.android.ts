import * as commonPicker from './picker.common';

export namespace knownTemplates {
    export let itemTemplate = "itemTemplate";
}

export class PickerField extends commonPicker.PickerField {
    initNativeView() {
        super.initNativeView();
        this.nativeTextViewProtected.setFocusable(false);
        this.nativeTextViewProtected.setLongClickable(false);
    }
}
