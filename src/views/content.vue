<template>
  <static-fullscreen-card>
    <template v-slot:title>{{
      currentFolder.name == "root" ? title : currentFolder.name
    }}</template>
    <template v-slot:actions>
      <v-btn
        :disabled="currentFolder.parent_id ? true : false"
        color="primary"
        @click="onClickUp(currentFolder.parent_id)"
        >Вверх</v-btn
      >
      <v-btn color="primary" @click="createNew()">Создать</v-btn></template
    >
    <portal to="v-main">
      <content-dialog
        v-model="showEditDialog"
        :id="idEdit"
        :defaults="{ parent_id: currentFolder.id }"
      ></content-dialog>
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
    contentDialog: () => import("./contentDialog"),
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
      model: this.$store.getters["config/get"].models.content.list,
      url: "/manager/content",
      defaults: {
        filters: { parent_id: 0 },
        sort: { key: "id", order: "ASC" },
      },
    };
  },
  created() {
    this.$root.title = "Контент";
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
