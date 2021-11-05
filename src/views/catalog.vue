<template>
  <div>
    <static-fullscreen-card>
      <template v-slot:header></template>
      <template v-slot:actions>
        <v-btn color="primary" @click="$refs.table.reloadData()"
          >Обновить</v-btn
        >
        <v-btn color="primary" @click="showImportDialog = true">Импорт</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on"> Экспорт </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              :href="$root.config.baseUrl + '/manager/catalog/export/1c'"
              target="_blank"
            >
              <v-list-item-title>1C</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn color="primary" @click="createNew()">Добавить</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              Групповое действие
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              v-if="$root.profile.role >= 200"
              @click="removeMany()"
            >
              <v-list-item-title>Удалить</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="groupAction({ status: 1 })"
              ><v-list-item-title>Активировать</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="groupAction({ status: 0 })"
              ><v-list-item-title>Деактивировать</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <catalog-dialog v-model="showEditDialog" :id="idEdit"></catalog-dialog>
      <portal to="v-main">
        <catalog-import v-model="showImportDialog"></catalog-import>
      </portal>

      <a-table-f-api
        ref="table"
        :api="url"
        :model="model"
        :useQuery="false"
        :defaults="defaults"
        @click="onClickRow($event)"
      />
    </static-fullscreen-card>
  </div>
</template>

<script>
import CatalogImport from "./catalogImport.vue";
export default {
  components: {
    catalogDialog: () => import("./catalogDialog.vue"),
    CatalogImport,
  },
  data() {
    return {
      idEdit: 0,
      showEditDialog: false,
      showImportDialog: false,
      title: "",
      model: this.$store.getters["config/get"].models.catalog.list,
      url: "/manager/catalog",
      defaults: {
        sort: { key: "id", order: "DESC" },
      },
    };
  },
  created() {
    this.$root.title = "Каталог";
  },
  watch: {
    showImportDialog() {
      if (!this.showEditDialog) {
        this.$refs.table.reloadData();
      }
    },
    showEditDialog() {
      if (!this.showEditDialog) {
        this.$refs.table.reloadData();
      }
    },
  },
  methods: {
    async removeMany() {
      let data = [];
      for (const el of this.$refs.table.data) {
        if (el.checked) data.push({ id: el.id });
      }
      let res = await this.$axios.delete(this.url, { data: { data: data } });
      this.$root.$emit("show-info", {
        text: "Данные удалены",
      });
      this.$refs.table.reloadData();
    },
    async groupAction(params) {
      let data = [];
      for (const el of this.$refs.table.data) {
        if (el.checked) {
          data.push(Object.assign({}, params, { id: el.id }));
        }
      }
      let res = await this.$axios.post(this.url + "/actions", { data: data });
      this.$root.$emit("show-info", {
        text: "Действие выполнено",
      });
      this.$refs.table.reloadData();
    },
    onClickRow(d) {
      if (d.field.name !== "checked") {
        this.showEditDialogFun(d.row.id);
      }
    },
    createNew() {
      this.showEditDialogFun(0);
    },
    showEditDialogFun(id) {
      this.idEdit = id;
      this.showEditDialog = true;
    },
  },
};
</script>
