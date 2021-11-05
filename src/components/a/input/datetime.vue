<template>
  <a-form-input :value="value" :label="model.title">
    <template v-slot:default>
      <div class="d-inline-block">
        <v-icon>mdi-calendar</v-icon>
        <div class="d-inline-block">
          <a-input-base-date-picker v-model="date" />
        </div>
      </div>
      <div class="d-inline-block pl-5">
        <v-icon>mdi-clock</v-icon>
        <div class="d-inline-block">
          <a-input-base-time-picker v-model="time" />
        </div>
      </div>
    </template>
  </a-form-input>
</template>

<script>
export default {
  props: {
    value: [String],
    model: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    dateObject() {
      return new Date(this.value);
    },
    time: {
      get: function () {
        return this.dateObject.time;
      },
      set: function (v) {
        this.$emit("input", this.date + " " + v);
      },
    },
    date: {
      get: function () {
        return this.dateObject.date;
      },
      set: function (v) {
        this.$emit("input", v + " " + this.time);
      },
    },
  },
};
</script>