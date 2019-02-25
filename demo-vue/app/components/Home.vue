<template>
  <Page class="page">
    <ActionBar title="PickerField Demo Vue">
    </ActionBar>
    <GridLayout rows="50, *">
      <!-- <PickerField hint="Click here" padding="10"></PickerField> -->
      <!-- <PickerField hint="Click here" padding="10" [items]="pickerItems"></PickerField> -->
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
  data() {
    return {
      pickerItems: []
    };
  },
  methods: {
    onPickTimeTap: function(args) {},
    getItemList(count) {
      let itemList = [];
      for (let i = 1; i <= count; i++) {
        itemList.push({
          id: i,
          name: `Item ${i}`,
          description: `Item ${i} description`
        });
      }
      return itemList;
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
.content {
}
</style>
