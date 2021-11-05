<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    :options.sync="options"
    :server-items-length="pager.count"
    :sort-by="sort.key"
    :sort-desc="sort.order == 'ASC' ? true : false"
    :footer-props="{ itemsPerPageOptions: listSize }"
    @click:row="$emit('click', $event)"
    class="elevation-1"
  >
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td v-for="(el, i) in headers" :key="i">
          <component
            v-if="
              getModelByName(el.value) &&
              getModelByName(el.value).type &&
              componentExist(getModelByName(el.value).type)
            "
            :is="getComponentName(getModelByName(el.value).type)"
            :model="getModelByName(el.value)"
            :value="item[el.value]"
          />
          <div v-else-if="el.value == 'actions'">
            <slot name="item.actions" v-bind:item="item" />
          </div>
          <div v-else>
            {{ item[el.value] }}
          </div>
        </td>
      </tr>
    </template>
    <template no-data>
      <slot name="no-data" />
    </template>
  </v-data-table>
</template>

<script>
import { components } from "../../../mixings";

export default {
  mixins: [components],
  props: {
    data: Array,
    model: [Object, Array],
    loading: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Object,
      default: {},
    },
    pager: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      listSize: [25, 50, 100],
    };
  },
  computed: {
    options: {
      get() {
        return {
          page: this.pager.page + 1,
          itemsPerPage: +this.pager.limit,
          groupBy: "",
          groupDesc: false,
          multiSort: false,
          mustSort: false,
        };
      },
      set(v) {
        this.$emit("change-options", v);
      },
    },
    headers() {
      let res = [];
      for (let i = 0; i < this.model.length; i++) {
        res.push({ text: this.model[i].title, value: this.model[i].name });
      }
      res.push({ text: "Actions", value: "actions", sortable: false });
      return res;
    },
  },
  methods: {
    getModelByName(name) {
      return this.model.find((x) => x.name == name);
    },
  },
};
</script>