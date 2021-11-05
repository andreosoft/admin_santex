<template>
  <v-dialog
    ref="dialog"
    v-model="showPicker"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot>
        <div v-bind="attrs" v-on="on"><a-view-base-time :value="time"/></div>
      </slot>
    </template>
    <v-time-picker v-if="showPicker" v-model="time" full-width>
      <v-spacer></v-spacer>
      <a-btn-cancel @click="showPicker = false"/>
      <a-btn-ok @click="$refs.dialog.save(time)"/>
    </v-time-picker>
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
    time: {
      get: function () {
        return this.value;
      },
      set: function (v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>