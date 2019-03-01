<template>
  <Page class="page">
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <GridLayout rows="50, *">
      <PickerField hint="Styling" 
                  row="0"
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
    </GridLayout>
  </Page>
</template>

<script>
import { PickerField } from "nativescript-picker";
import * as frameModule from "tns-core-modules/ui/frame";
export default {
  name: "Styling",
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
      title: "Styling"
    };
  },
  methods: {
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

.item-template-top-label {
    margin: 20;
    font-weight: bold;    
}

.red-label {
    color: red;
}

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
</style>
