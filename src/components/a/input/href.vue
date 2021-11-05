<template>
  <a-form-input :value="true" :label="model.title">
    <template v-slot:default>
      <input v-if="edit" :value="value" @input="$emit('input', $event.target.value)"/>
      <a v-else :href="value" target="_blank">{{ value }}</a>
    </template>
    <template v-slot:append>
      <v-icon
        small
        class="mr-2"
        @click.prevent="edit = !edit"
      >
        {{ edit ? 'mdi-pencil-off' : 'mdi-pencil'}}
      </v-icon>
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
  data() {
    return {
      edit: false
    }
  }
};
</script>