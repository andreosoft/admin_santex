<template>
  <div>
    <div v-for="(el, i) in model" :key="i">
      <component
        v-if="el.type"
        :is="'a-input-' + el.type"
        :model="el"
        :values="data"
        :value="data[el.name]"
        @input="onInput($event, el)"
        :error="el.type == 'ref' ? errors[el.name + '_id'] : errors[el.name]"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    model: Array,
    errors: Object
  },
  computed: {
    data: {
      set(v) {
        this.$emit("input", v);
      },
      get() {
        return this.value;
      },
    },
  },
  methods: {
    async onInput(e, el) {
      if (typeof e === "object" && e !== null) {
        Object.assign(this.data, e);
      } else {
        this.data[el.name] = e;
      }
      this.$emit("validate", el.name);
    },
  },
};
</script>