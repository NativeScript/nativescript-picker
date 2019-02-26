<template>
  <Page class="page">
    <ActionBar title="PickerField Demo Vue">
    </ActionBar>
    <GridLayout rows="50, 50, 50, 50, *">
      <PickerField hint="Getting Started" padding="10" :items="pickerItems"></PickerField>

      <PickerField hint="Styling" 
                  row="1"
                  padding="10"
                  :pickerTitle="pickerTitle"
                  for="item in pickerObjects"
                  class="picker-field" 
                  textField="name"
                  iOSCloseButtonIcon="14" 
                  iOSCloseButtonPosition="left"
                  androidCloseButtonPosition="actionBar"
                  androidCloseButtonIcon="ic_media_previous">
        <v-template>
          <GridLayout columns="auto, *" rows="auto, *" backgroundColor="lightBlue">
            <Label text="Static text: " colSpan="2" class="item-template-top-label"></Label>
            <Label :text="item.name" col="0" row="1" class="item-template-label red-label"
                marginBottom="20"></Label>
            <Image :src="item.imageUrl" col="1" row="0" rowSpan="2" class="item-template-picture"></Image>
          </GridLayout>
        </v-template>
      </PickerField>

      <PickerField hint="Value APIs" 
                  ref="apiPicker"
                  row="2"
                  padding="10"
                  for="item in pickerObjects"
                  textField="description"
                  valueField="name"
                  pickerTitle="Select item from list">
        <v-template>
          <GridLayout rows="auto, auto, auto" backgroundColor="lightBlue">
            <Label :text="item.id" class="item-template-label red-label" margin="20"></Label>
            <Label :text="item.name" row="1" class="item-template-label green-label"></Label>
            <Label :text="item.description" row="2" class="item-template-label green-label" marginBottom="20"></Label>
            </GridLayout>
        </v-template>
      </PickerField>
      <Button row="3" @tap="checkTap" text="Check picker value APIs"></Button>
    </GridLayout>>
  </Page>
</template>

<script>
import { PickerField } from "nativescript-picker";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
export default {
  computed: {
    message() {
      return "test";
    }
  },
  created() {
    for(let i = 0; i < 100; i++) {
      this.pickerItems.push("Item " + i);
    }

    for(let i = 0; i < 20; i++) {
      this.pickerObjects.push({ id: i, name: "Item " + i, description: "Description " + i , imageUrl: "https://picsum.photos/150/70/?random" });
    }
  },
  data() {
    return {
      pickerItems: [],
      pickerObjects: [],
      pickerTitle: "Select item from list"
    };
  },
  methods: {
    checkTap: function(args) {
      let picker = this.$refs.apiPicker.nativeView;
      console.log("text: ", picker.text);
        console.log("selectedValue: ", picker.selectedValue);
        console.log("selectedIndex:", picker.selectedIndex);
        alert({
            title: "PickerField available APIs:",
            message: `text: ${picker.text}\n` + `selectedValue: ${picker.selectedValue}\n` + `selectedIndex: ${picker.selectedIndex}`,
            okButtonText: "OK"
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../app-variables";

.item-template-label {
    margin-left: 20;
}

.item-template-top-label {
    margin: 20;
    font-weight: bold;    
}

.green-label {
    color: green;
}

.red-label {
    color: red;
}

/* Styling css start */

.picker-field {
    background-color: lightblue;
    color: blue;
}

ListView.picker-field {
    background-color: green;
    margin-left: 20;
    margin-right: 20;
    margin-bottom: 20;
    separator-color: red;
}

ActionBar.picker-field {
    background-color:yellow;
    color:black;
}

.item-template-picture {
    height: 70;
    width: 150;
    margin: 20;
    margin-left: 100;
}

/* Styling css end */
</style>
