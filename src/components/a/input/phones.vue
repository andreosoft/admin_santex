<template>
  <div>
    <div>
      <div class="text-right pa-4">
        <v-btn class="ma-1" @click="addPhone()">Добавить новый телефон</v-btn>
      </div>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr v-for="(item, i) in items" :key="i">
            <td><v-select v-model="item.type" :items="types" /></td>
            <td style="width: 100%">
              <v-text-field :disabled="item.type == 1" v-model="item.phone" />
            </td>
            <td>
              <v-btn
                v-if="item.type == 3"
                fab
                small
                class="mr-2"
                @click.prevent="callWhatsapp(item.phone)"
              >
                <v-icon> mdi-whatsapp </v-icon>
              </v-btn>
              <v-btn
                v-else
                fab
                small
                class="mr-2"
                @click.prevent="$root.$emit('global-call', item.phone)"
              >
                <v-icon> mdi-phone </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number, Array],
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
      types: [
        {
          value: 1,
          text: "Основной",
        },
        {
          value: 2,
          text: "Дополнительный",
        },
        {
          value: 3,
          text: "Whatsapp",
        },
      ],
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  watch: {
    value(val) {
      this.items = this.getItems();
    },
    items: {
      handler(v) {
        this.$emit("input", JSON.stringify(v));
      },
      deep: true,
    },
  },
  methods: {
    getItems() {
      let res;
      try {
        res = JSON.parse(this.value);
      } catch (error) {
        res = this.value;
      }
      if (!Array.isArray(res)) {
        res = [
          {
            phone: this.value,
            type: 1,
          },
        ];
      }
      return res;
    },
    addPhone() {
      this.items.push({
        phone: null,
        type: 2,
      });
    },
    callWhatsapp(number) {
      let message = "";
      window.open('https://web.whatsapp.com/send?phone='+number+'&text='+message, '_blank').focus();
    }
  },
};
</script>