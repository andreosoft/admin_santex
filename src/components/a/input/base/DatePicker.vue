<template>
  <v-dialog
    ref="dialog"
    v-model="showPicker"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot>
        <div v-bind="attrs" v-on="on"><a-view-base-date :value="date"/></div>
      </slot>
    </template>
    <v-date-picker v-if="showPicker" v-model="date" full-width>
      <v-spacer></v-spacer>
      <a-btn-cancel @click="showPicker = false" />
      <a-btn-ok @click="$refs.dialog.save(date)" />
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
    };
  },
  computed: {
    date: {
      get: function () {
        if (!this.value) return (new Date()).date
        return this.value;
      },
      set: function (v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>