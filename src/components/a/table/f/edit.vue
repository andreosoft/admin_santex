<template>
  <div>
    <!-- <b-table-select2
      v-if="field.type == 'ref-table'"
      :value="{value: values[field.name + '_id'], text: values[field.name]}"
      @input="e = {}; e[field.name + '_id'] = $event.value; e[field.name] = $event.text; $emit('input', e)"
      :api="field.data.api"
      :fieldsName="field.data.fieldsName"
      :error="error"
    ></b-table-select2>
    <b-input
      v-else
      :value="value"
      @input="e = {}; e[field.name] = $event; $emit('input', e)"
      :error="error"
    ></b-input> -->
  </div>
</template>

<script>
// import BInput from "@/wid/binputs/input.vue";
// import BTableSelect2 from "@/wid/binputs/tableSelect.vue";

export default {
  name: "table2Edit",
  components: {
    // BInput,
    // BTableSelect2
  },
  props: {
    values: Object,
    field: Object,
    error: String
  },
  computed: {
    value() {
      return this.values[this.field.name];
    }
  }
};
</script>