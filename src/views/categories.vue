<template>
  <static-fullscreen-card>
    <template v-slot:title>{{
      currentFolder.name == "root" ? title : currentFolder.name
    }}</template>
    <template v-slot:actions>
      <v-btn
        :disabled="currentFolder.name == 'root' ? true : false"
        color="primary"
        @click="onClickUp(currentFolder.parent_id)"
        >Вверх</v-btn
      >
      <v-btn color="primary" @click="createNew()">Создать</v-btn></template
    >
    <portal to="v-main">
      <categories-dialog
        v-model="showEditDialog"
        :id="idEdit"
        :defaults="{ parent_id: currentFolder.id }"
      ></categories-dialog>
    </portal>
    <a-table-f-api
      ref="table"
      :api="url"
      :model="model"
      :useQuery="false"
      :defaults="defaults"
      @click="onClickRow($event)"
      @dataUpdated="onDataUpdated($event)"
    />
  </static-fullscreen-card>
</template>

<script>
export default {
  components: {
    categoriesDialog: () => import("./categoriesDialog"),
  },
  data() {
    return {
      idEdit: 0,
      showEditDialog: false,
      currentFolder: {
        name: "",
        id: 0,
        parent_id: 0,
      },
      title: "",
      model: this.$store.getters["config/get"].models.categories.list,
      url: "/manager/categories",
      defaults: {
        filters: { parent_id: 0 },
        sort: { key: "id", order: "ASC" },
      },
    };
  },
  created() {
    this.title = "Категории";
    this.$root.title = this.title;
  },
  watch: {
    showEditDialog() {
      if (!this.showEditDialog) {
        this.$refs.table.updateData();
      }
    },
  },
  methods: {
    onClickUp(parent_id) {
      this.defaults.filters.parent_id = parent_id;
      this.$refs.table.init();
    },
    onClickRow(d) {
      if (d.field.type !== "folder") {
        this.showEditDialogFun(d.row.id);
      }
    },
    onDataUpdated(data) {
      this.currentFolder = data.parent;
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
