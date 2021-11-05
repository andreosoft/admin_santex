<template>
  <div>
    <dialog-window :value="value" @input="$emit('input')">
      <template v-slot:title
        >{{ id ? data.name : "Новый" }}
        <small v-if="id"> ({{ id }})</small>
      </template>
      <a-form-model
        v-model="data"
        :model="model"
        :errors="errors"
        @validate="validate($event)"
      />
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit()" color="primary">Записать</v-btn>
        <v-btn v-if="id" @click="removeDialogShow = true" color="error"
          >Удалить</v-btn
        >
        <v-btn @click="$emit('input')">Закрыть</v-btn>
      </template>
    </dialog-window>
    <dialog-window v-model="removeDialogShow">
      Вы действительно хотите удалить этот элемент?
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="remove(api, id)" color="error">Удалить</v-btn>
        <v-btn @click="removeDialogShow = false">Отмена</v-btn>
        <v-spacer></v-spacer>
      </template>
    </dialog-window>
  </div>
</template>

<script>
import { getForm, submitForm, removeEl } from "./mixings";

export default {
  mixins: [getForm, submitForm, removeEl],
  props: {
    value: Boolean,
    id: Number,
    model: Array,
    api: String,
    defaults: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      removeDialogShow: false,
    };
  },
  watch: {
    value() {
      if (this.value) this.updateData(this.id);
    },
  },
  methods: {
    afterRemove(data) {
      this.removeDialogShow = false;
      this.$emit("input");
    },
    afterSave(data, status) {
      if (status) this.$emit("input");
    },
  },
};
</script>