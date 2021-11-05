<template>
  <static-fullscreen-card>
    <template v-slot:header></template>
    <template v-slot:actions
      ><v-btn color="primary" @click="createNew()">Создать</v-btn></template
    >
    <portal to="v-main">
      <users-dialog v-model="showEditDialog" :id="idEdit"></users-dialog>
    </portal>
    <a-table-f-api
      ref="table"
      :api="url"
      :model="model"
      :useQuery="true"
      :defaults="defaults"
      @click="onClickRow($event)"
    />
  </static-fullscreen-card>
</template>

<script>
export default {
  components: {
    usersDialog: () => import("./usersDialog"),
  },
  data() {
    return {
      idEdit: 0,
      showEditDialog: false,
      title: "",
      model: this.$store.getters["config/get"].models.users.list,
      url: "/manager/users",
      defaults: {
        sort: { key: "id", order: "ASC" },
      },
    };
  },
  created() {
    this.$root.title = "Пользователи";
  },
  watch: {
    showEditDialog() {
      if (!this.showEditDialog) {
        this.$refs.table.updateData();
      }
    },
  },
  methods: {
    onClickRow(d) {
      this.showEditDialogFun(d.row.id);
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
