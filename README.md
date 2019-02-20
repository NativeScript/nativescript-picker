# nativescript-picker


[![Build Status](https://travis-ci.org/NativeScript/nativescript-picker.svg?branch=master)](https://travis-ci.org/NativeScript/nativescript-picker)
[![npm](https://img.shields.io/npm/v/nativescript-picker.svg)](https://www.npmjs.com/package/nativescript-picker)
[![npm](https://img.shields.io/npm/dt/nativescript-picker.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-picker)
[![Dependency status](https://david-dm.org/NativeScript/nativescript-picker.svg)](https://david-dm.org/NativeScript/nativescript-picker)
[![peerDependencies Status](https://david-dm.org/NativeScript/nativescript-picker/peer-status.svg)](https://david-dm.org/NativeScript/nativescript-picker?type=peer)

A NativeScript plugin that provides ui element for picking an object/value from a list opened in a modal popup.

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
    - [PickerField](#PickerField)
- [API](#api)
- [Contribute](#contribute)
- [Get Help](#get-help)

## Screenshots

<img alt="PickerField on iOS" src="https://raw.githubusercontent.com/NativeScript/nativescript-picker/master/docs/picker-ios.gif" height="590px"/><img alt="PickerField on Android" src="https://raw.githubusercontent.com/NativeScript/nativescript-picker/master/docs/picker-android.gif" height="590px"/>

## Installation

```javascript
tns plugin add nativescript-picker
```

## Configuration
No additional configuration required!

## Usage
To use the `PickerField` in markup you need to:
 - If you are developing a NativeScript Core app, you need to register the plugin namespace in the xml:
 ```xml
 <Page
    xmlns="http://schemas.nativescript.org/tns.xsd"
    xmlns:picker="nativescript-picker">
    <picker:PickerField hint="Click here" items="{{ pickerItems }}"/>
...
 ```
 - If you are developing a NativeScript Angular app, you need to import the plugin module in the module of your component: 
```ts
import { NativeScriptPickerModule } from "nativescript-picker/angular";
...
@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptPickerModule,
        ...
    ],
    ...
 ```
 Then you will be able to declare the fields in the html of your component:
```html
<PickerField hint="Click here" [items]="pickerItems"></PickerField>
```
 - If you are developing a NativeScript Vue app, you need to install the plugin in you app.js file:
 ```js
import Vue from "nativescript-vue";
import { PickerField } from 'nativescript-picker/vue';

Vue.use(PickerField);
 ```
Then you will be able to declare the fields in the template of your component:
```html
<PickerField hint="Click here"></PickerField>
```

## Features

### PickerField

The `PickerField` is a NativeScript `TextField` which means that any functionality the default `TextField` provides is also available in the `PickerField` component. The only difference is that by design it is in "read-only" mode, or simply put you cannot change its text by input or select that text. Changing the text of the `PickerField` is done by its main functionality which is opening a modal popup that shows a list of objects from which you can select one by tapping it.

## API

| Property | Description |
| --- | --- |
| `pickerTitle` | The title of the modal view. |
| `items` | The source collection used to populate the list of the modal view. |
| `itemTemplate` | Тhe UI template for list view items of the list of the modal view. |
| `modalAnimated` | Optional parameter specifying whether to show the modal view with animation. |
| `textField` | The 'property' of the object from the 'items' collection that will be used by the 'text' property of the PickerField. |
| `valueField` | The 'property' of the object from the 'items' collection that will be used by when setting the 'selectedValue' property of the PickerField. |
| `selectedValue` | The object selected from the list in the modal view. |
| `selectedIndex` | The index of the object from the 'items' collection that has been selected from the list in the modal view. |
| `iOSCloseButtonPosition` | The position of the 'close' button of the ActionBar of the modal view. |
| `iOSCloseButtonIcon` | The icon of the 'close' button of the ActionBar of the modal view. |
| `androidCloseButtonPosition` | The position of the 'close' button of the ActionBar of the modal view. |
| `androidCloseButtonIcon` | The icon of the 'close' button of the ActionBar of the modal view. |


## Styling

### PickerField
The `PickerField` inherits from the `TextField` class of the `tns-core-modules/ui/text-field/text-field` module which means all of the available styling of `TextField` are available directly. Additionally the `PickerField` opens a modal window contains a `ListView` instance which inherits the css class of the `PickerField` meaning you can style that ListView elements with the use of `ListView.<your-class-name>` and simply set the `class` of the `PickerField` to `your-class-name`. The modal window also contains its own ActionBar which again inherits the css class of the `PickerField` and can be styling the same way as described above for the ListView. For full list of the available properties of which many can be styling/set via css you can refer the official API documentation of ListView [here](https://docs.nativescript.org/api-reference/modules/_ui_list_view_).
    
## Contribute
We love PRs! Check out the [contributing guidelines](CONTRIBUTING.md). If you want to contribute, but you are not sure where to start - look for [issues labeled `help wanted`](https://github.com/NativeScript/nativescript-picker/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

## Get Help
Please, use [github issues](https://github.com/NativeScript/nativescript-picker/issues) strictly for [reporting bugs](CONTRIBUTING.md#reporting-bugs) or [requesting features](CONTRIBUTING.md#requesting-new-features). For general questions and support, check out [Stack Overflow](https://stackoverflow.com/questions/tagged/nativescript) or ask our experts in [NativeScript community Slack channel](http://developer.telerik.com/wp-login.php?action=slack-invitation).
