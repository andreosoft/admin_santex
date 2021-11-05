<template>
  <div>
    <div>
      <div>
        <v-simple-table>
          <tbody>
            <tr v-for="(item, i) in items" :key="i">
              <td style="width: 50%">
                <v-select
                  :items="options"
                  item-text="fullName"
                  item-value="id"
                  v-model="item.id"
                />
              </td>
              <td><v-text-field v-model="item.value" /></td>
              <td style="width: 1%">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="error"
                  @click.prevent="remove(i)"
                >
                  <v-icon dark> mdi-close </v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td style="width: 50%" />
              <td />
              <td style="width: 1%">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click.prevent="addRow()"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
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
      options: [],
    };
  },
  created() {
    this.getFiltersOptions();
  },
  computed: {
    items: {
      get() {
        return this.value;
      },
      set(v) {
        console.log(v);
        this.$emit("input", v);
      },
    },
  },
  methods: {
    async getFiltersOptions() {
      let resp = await this.$axios.get("/manager/filters", {
        params: { sort: { key: "name", order: "ASC" } },
      });
      this.options = [];
      for (let el of resp.data.data) {
        let d = el;
        d.fullName = el.name;
        if (el.unit) d.fullName += ", " + el.unit;
        this.options.push(d);
      }
    },
    remove(i) {
      let e = this.items;
      e.splice(i, 1);
      this.items = e;
    },
    addRow() {
      let e = this.items;
      e.push({
        name: "",
        type: 2,
        unit: "",
        value: "",
      });
      this.items = e;
    },
  },
};
</script>