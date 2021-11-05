<template>
  <v-dialog ref="dialog" v-model="showPicker" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot>
          {{ value }}
        </slot>
      </div>
    </template>
    <v-date-picker v-if="showPicker" v-model="dates" full-width range :first-day-of-week="1">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="onClear()">{{
        $t("clear")
      }}</v-btn>
      <a-btn-cancel @click="showPicker = false" />
      <a-btn-ok @click="onSave()" />
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      showPicker: false,
      dates: [new Date().date, new Date().date],
    };
  },
  watch: {
    value() {
      if (Array.isArray(this.value)) this.dates = this.value.split(" - ");
    },
  },
  methods: {
    onSave() {
      this.showPicker = false;
      this.$emit("input", this.dates.join(" - "));
    },
    onClear() {
      this.showPicker = false;
      this.$emit("input", "");
    }
  },
  // computed: {
  //   date: {
  //     get: function () {
  //       if (!this.value) return ["", ""]
  //       return this.value.split("-");
  //     },
  //     set: function (v) {
  //       this.$emit("input", v.join("-"));
  //     },
  //   },
  // },
};
</script>

<style lang="scss">
.a-filter-input-block {
  width: 100;
  border: 1px solid;
}
</style>