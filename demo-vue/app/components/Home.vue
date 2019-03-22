<template>
    <Page>
      <ActionBar title="PickerField Vue">
      </ActionBar>
      <ListView ref="listView"
                  for="example in examples"
                  @itemTap="goToExample">
          <v-template>
            <StackLayout class="item" orientation="vertical">
                <Label :text="example.name" class="titleLabel"></Label>
                <StackLayout height="1" backgroundColor="#EEEEEE"></StackLayout>
            </StackLayout>
          </v-template>
      </ListView>
    </Page>
</template>

<script>
import GettingStarted from './GettingStarted';
import Styling from './Styling';
import ValueApis from './ValueApis';
export default {
    name: 'Home',
    data() {
      return {
        examples: [
            GettingStarted,
            Styling,
            ValueApis
          ],
      };
    },
    methods: {
      goToExample({ item }) {
        this.$navigateTo(item);
      }
    }
  };
</script>

<style lang="scss">

.itemStackLayout {
  text-align: left;
  vertical-align: center;
  font-size: 16;
}

.titleLabel {
  margin: 16;
  vertical-align: center;
}
</style>

