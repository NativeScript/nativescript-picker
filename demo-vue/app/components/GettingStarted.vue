<template>
  <Page class="page">
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <GridLayout rows="50, *">
      <PickerField hint="Click here" padding="10" :items="pickerItems"></PickerField>
    </GridLayout>>
  </Page>
</template>

<script>
import { PickerField } from "nativescript-picker";
import * as frameModule from "tns-core-modules/ui/frame";
export default {
  name: "Getting Started",
  computed: {
  },
  created() {
    for(let i = 0; i < 100; i++) {
      this.pickerItems.push("Item " + i);
    }
  },
  data() {
    return {
      pickerItems: [],
      title: "Getting Started"
    };
  },
  methods: {
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },
  }
};
</script>

<style lang="scss">
</style>
