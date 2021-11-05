<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input')"
      max-width="800"
      content-class="fullscreen-dialog"
    >
      <a-loader v-if="loading" />
      <v-stepper v-model="e1" style="height: 100%">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Загрузка 1
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Настройка 2
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Результат 3 </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items
          style="position: absolute; bottom: 0; top: 60px; left: 0; right: 0"
        >
          <v-stepper-content step="1" style="height: 100%">
            <div
              style="
                position: absolute;
                bottom: 60px;
                top: 10px;
                left: 0px;
                right: 0px;
                overflow: auto;
              "
            >
            <div class="ma-4">
              <a-form-model
                v-model="data"
                :model="model"
                :errors="errors"
                @validate="validate($event)"
              />
            </div>
            </div>
            <div
              class="v-card__actions"
              style="position: absolute; bottom: 0; left: 0; right: 0"
            >
              <v-spacer />
              <v-btn
                :disabled="data.file ? false : true"
                color="primary"
                @click="e1 = 2"
              >
                Далее
              </v-btn>
              <v-btn @click="$emit('input')"> Закрыть </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div
              style="
                position: absolute;
                bottom: 60px;
                top: 20px;
                left: 20px;
                right: 20px;
                overflow: auto;
              "
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Поля в файле</th>
                      <th class="text-left">Поля в базе</th>
                      <th class="text-left">Тип поля</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in structureData" :key="item.fileName">
                      <td>{{ item.fileName }}</td>
                      <td>
                        <v-select
                          v-model="item.baseName"
                          :items="structureOptions"
                          item-text="text"
                          item-value="value"
                          :clearable="true"
                        />
                      </td>
                      <td>
                        <v-select
                          v-model="item.type"
                          :items="structureTypes"
                          item-text="text"
                          item-value="value"
                          :clearable="true"
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>

            <div
              class="v-card__actions"
              style="position: absolute; bottom: 0; left: 0; right: 0"
            >
              <v-spacer />
              <v-btn
                :disabled="data.file ? false : true"
                color="primary"
                @click="e1 = 3"
              >
                Далее
              </v-btn>
              <v-btn @click="e1 = 1"> Назад </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div
              class="my-4"
              style="
                position: absolute;
                bottom: 60px;
                top: 20px;
                left: 20px;
                right: 20px;
                overflow: auto;
              "
            >
              <v-textarea outlined rows="10" v-model="importResult" />
            </div>
            <div
              class="v-card__actions"
              style="position: absolute; bottom: 0; left: 0; right: 0"
            >
              <v-spacer />
              <v-btn color="primary" @click="$emit('input')"> Готово </v-btn>
              <v-btn @click="e1 = 2"> Назад </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import { validate, fillForm } from "./../components/mixings";
export default {
  mixins: [validate, fillForm],
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      e1: 1,
      loading: false,
      importResult: "",
      defaults: {
        encoding: "utf8",
        separator: ",",
      },
      model: [
        {
          name: "encoding",
          title: "Выберите кодировку",
          type: "select",
          options: [
            {
              value: "utf8",
              text: "utf-8",
            },
            {
              value: "win1251",
              text: "Windows-1251",
            },
          ],
          validator: ["req"],
        },
        {
          name: "separator",
          title: "Выберите разделитель",
          type: "select",
          options: [
            {
              value: ",",
              text: ",",
            },
            {
              value: ";",
              text: ";",
            },
          ],
          validator: ["req"],
        },
        {
          name: "file",
          type: "file",
          title: "Выберите файл",
          validator: ["req"],
        },
      ],
      structureOptions: [],
      structureTypes: [
        {
          value: 1,
          text: "Ключ",
        },
        {
          value: 2,
          text: "Основное",
        },
      ],
      structureData: [],
    };
  },
  watch: {
    value(val) {
      if (val) this.init();
    },
    e1(val) {
      if (val === 2) {
        this.fitchStructure();
      } else if (val === 3) {
        this.genImport();
      }
    },
  },
  created() {
    this.$root.$on("websocket", (data) => {
      if (data.import && data.import.message) {
        this.importResult += data.import.message + "\n";
      }
    });
  },
  methods: {
    init() {
      this.e1 = 1;
      this.importResult = "";
      this.loading = false;
      this.fillForm();
    },
    async genImport() {
      this.loading = true;
      this.importResult = "";
      const resp = await this.$axios.post("/manager/catalog/csv_gen", {
        data: this.data,
        structureData: this.structureData,
      });
      this.loading = false;
    },
    async fitchStructure() {
      this.loading = true;
      const resp = await this.$axios.post(
        "/manager/catalog/csv_structure",
        this.data
      );
      this.structureData = resp.data.data;
      this.structureOptions = resp.data.structure;
      this.loading = false;
    },
  },
};
</script>