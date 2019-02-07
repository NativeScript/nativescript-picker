# nativescript-picker  ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)


[![Build Status](https://travis-ci.org/NativeScript/nativescript-picker.svg?branch=master)](https://travis-ci.org/NativeScript/nativescript-picker)
[![npm](https://img.shields.io/npm/v/nativescript-picker.svg)](https://www.npmjs.com/package/nativescript-picker)
[![npm](https://img.shields.io/npm/dt/nativescript-picker.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-picker)
[![Dependency status](https://david-dm.org/NativeScript/nativescript-picker.svg)](https://david-dm.org/NativeScript/nativescript-picker)
[![peerDependencies Status](https://david-dm.org/NativeScript/nativescript-picker/peer-status.svg)](https://david-dm.org/NativeScript/nativescript-picker?type=peer)

In case you develop UI plugin, this is where you can add some screenshots.

## (Optional) Prerequisites / Requirements

Describe the prerequisites that the user need to have installed before using your plugin. See [nativescript-firebase plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase) for example.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-picker
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
	```javascript
    Usage code snippets here
    ```)

## Styling

### PickerTextField
The `PickerTextField` inherits from the `TextField` class of the `tns-core-modules/ui/text-field/text-field` module which means all of the available styling of `TextField` are available directly. Additionally the `PickerTextField` opens a modal window contains a `ListView` instance which inherits the css class of the `PickerTextField` meaning you can style that ListView elements with the use of `ListView.<your-class-name>` and simply set the `class` of the `PickerTextField` to `your-class-name`. For full list of the available properties of which many can be styling/set via css you can refer the official API documentation of ListView (here)[https://docs.nativescript.org/api-reference/modules/_ui_list_view_].

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

Apache License Version 2.0, January 2004
