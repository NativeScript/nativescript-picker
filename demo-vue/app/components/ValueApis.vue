<template>
  <Page class="page">
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <GridLayout rows="50, 50, *">
      <PickerField hint="Click here" 
                  ref="apiPicker"
                  row="0"
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
      <Button row="1" @tap="checkTap" text="Check picker value APIs"></Button>
    </GridLayout>
  </Page>
</template>

<script>
import { PickerField } from "nativescript-picker";
import * as frameModule from "tns-core-modules/ui/frame";
import { Button } from "tns-core-modules/ui/button";
export default {
  name: "Value APIs",
  computed: {
  },
  created() {
    for(let i = 0; i < 20; i++) {
      this.pickerObjects.push({ id: i, name: "Item " + i, description: "Description " + i , imageUrl: "https://picsum.photos/150/70/?random" });
    }
  },
  data() {
    return {
      pickerObjects: [],
      pickerTitle: "Select item from list",
      title: "Value APIs"
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
    },
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },
  }
};
</script>

<style scoped lang="scss">
@import "../app-variables";

.item-template-label {
    margin-left: 20;
}

.green-label {
    color: green;
}

.red-label {
    color: red;
}
</style>
