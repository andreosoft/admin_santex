<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input')"
      content-class="fullscreen-dialog"
    >
      <v-card style="height: 100%">
        <v-toolbar dark color="primary" fixed>
          <v-btn icon dark @click="$emit('input')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Контент</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn v-if="id && $root.profile.role >= 200" @click="removeDialogShow = true" color="error">
              Удалить
            </v-btn>
            <v-btn dark text @click="submit()"> Записать </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="pt-2">
          <v-tabs v-model="tab" class="px-4">
            <v-tab v-for="(tab, i) in tabs" :key="i" class="mr-3">{{
              tab.title
            }}</v-tab>
          </v-tabs>
          <div
            style="
              position: absolute;
              left: 0;
              right: 0;
              top: 112px;
              bottom: 0;
              overflow: auto;
            "
          >
            <v-tabs-items v-model="tab">
              <v-tab-item style="overflow: auto">
                <v-card-text>
                  <v-row>
                    <v-col>
                      <a-form-model
                        v-model="data"
                        :model="[
                          model[0],
                          model[1],
                          model[2],
                          model[3],
                          model[4],
                          model[5],
                        ]"
                        :errors="errors"
                        @validate="validate($event)"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-tab-item>
              <v-tab-item style="overflow: auto">
                <v-card-text>
                  <a-input-images
                    v-model="data.images"
                    :model="{
                      base_url: $root.config.baseUrl + '/image/download/',
                    }"
                  />
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </v-card>
    </v-dialog>
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
import { getForm, submitForm, removeEl } from "../components/mixings";

export default {
  mixins: [getForm, submitForm, removeEl],
  props: {
    value: Boolean,
    id: Number,
    defaults: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      removeDialogShow: false,
      tab: 0,
      tabs: [{ title: "Основные" }, { title: "Изображения" }],
      api: "/manager/content",
    };
  },
  computed: {
    model() {
      let r = this.$store.getters["config/get"].models.content.form;
      r.push({ name: "images" });
      return r;
    },
  },
  watch: {
    value() {
      if (this.value) {
        this.tab = 0;
        this.updateData(this.id);
      }
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
