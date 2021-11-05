<template>
  <div ref="table" class="f-table-wrapper">
    <div
      class="f-table"
      :style="{ minWidth: calcMinWidth }"
      @mouseup.stop="onSeparatorMouseup()"
      @mousemove.stop="onSeparatorMousemove($event)"
    >
      <slot name="loader">
        <a-loader v-if="loading" />
      </slot>
      <slot name="header">
        <div class="f-table-header">
          <div class="f-table-row">
            <template v-for="(field, i) in model">
              <template v-if="field.hidden" />
              <template v-else>
                <a-table-f-col
                  :key="i"
                  :sort="sort"
                  :sortable="field.sortable"
                  :width="filedsWidth[i]"
                  @sort="onClickHeader($event)"
                  :field="field.name ? field.name : ''"
                >
                  <span
                    v-if="field.name == 'checked'"
                    style="margin-top: -10px; margin-bottom: -22px"
                  >
                    <v-checkbox dense v-model="checkAll" />
                  </span>
                  <span v-else>
                    {{ field.title }}
                  </span>
                  <div
                    class="f-table-separator"
                    @mousedown.stop="onSeparatorMousedown($event, i)"
                  ></div>
                </a-table-f-col>
              </template>
            </template>
          </div>
          <div
            v-if="searchable"
            class="f-table-row"
            :class="{ searchable: searchable }"
          >
            <template v-for="(field, i) in model">
              <template v-if="field.hidden" />
              <template v-else>
                <a-table-f-search
                  :key="i"
                  :model="field"
                  :width="filedsWidth[i]"
                  :values="filters"
                  @input="onSelectInput($event)"
                >
                  <div
                    class="f-table-separator"
                    @mousedown.stop="onSeparatorMousedown($event, i)"
                  ></div>
                </a-table-f-search>
              </template>
            </template>
          </div>
        </div>
      </slot>
      <slot>
        <div
          class="f-table-body"
          :style="getStyleBody"
          :class="{ searchable: searchable }"
        >
          <div class="f-table-row f-table-background">
            <template v-for="(field, i) in model">
              <template v-if="field.hidden" />
              <template v-else>
                <div
                  class="f-table-col"
                  :style="{ width: filedsWidth[i] + 'px' }"
                  :key="i"
                >
                  <div
                    class="f-table-separator"
                    @mousedown.stop="onSeparatorMousedown($event, i)"
                  ></div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div
          ref="body"
          class="f-table-body"
          :style="getStyleBody"
          :class="{ searchable: searchable }"
        >
          <div
            v-for="(row, key) in data"
            :key="key"
            class="f-table-row f-table-row-body"
            :class="{ selected: selected.value == row.id }"
          >
            <template v-for="(field, i) in model">
              <template v-if="field.hidden" />
              <template v-else>
                <div
                  class="f-table-col"
                  :key="i"
                  :style="{ width: filedsWidth[i] + 'px' }"
                  @mousedown.stop="$emit('click', { row: row, field: field })"
                >
                  <component
                    v-if="field.view && componentExist(field.view)"
                    :is="getComponentName(field.view)"
                    :model="field"
                    :value="row[field.name]"
                    :values="row"
                  />
                  <component
                    v-else-if="field.type && componentExist(field.type)"
                    :is="getComponentName(field.type)"
                    :model="field"
                    :value="row[field.name]"
                    :values="row"
                  />
                  <div v-else-if="field.type == 'checkbox'">
                    <slot name="item.checkbox" v-bind:item="row">
                      <v-checkbox
                        :value="row.checked"
                        @click="clickCheckbox($event, row, key)"
                      />
                    </slot>
                  </div>
                  <div v-else-if="field.type == 'folder'">
                    <slot name="item.folder" v-bind:item="row">
                      <v-icon v-if="row.isparent">far fa-folder</v-icon>
                      <v-icon v-else>far fa-file</v-icon>
                    </slot>
                  </div>
                  <div v-else-if="field.name == 'actions'">
                    <slot name="item.actions" v-bind:item="row" />
                  </div>
                  <div v-else>
                    {{ row[field.name] }}
                  </div>
                  <div
                    class="f-table-separator"
                    @mousedown.stop="onSeparatorMousedown($event, i)"
                  ></div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </slot>
      <slot name="footer">
        <div v-if="footer" class="f-table-footer">
          <div class="f-table-row">
            <a-table-f-col
              v-for="(el, key) in footer"
              :key="key"
              :width="el.width"
              v-html="el.value"
            ></a-table-f-col>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>


<script>
import { components } from "../../../mixings";

let minWidth = 40;

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
    filters: {
      type: Object,
      default: () => {
        return {};
      },
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object,
      default: () => {
        return { text: "", value: 0 };
      },
    },
  },
  data() {
    return {
      lastCheckClick: null,
      tableHeight: 0,
      filedsWidth: [],
      checkAll: false,
      mousedown: { pressBtn: false, rowId: null, pos: null, currPos: null },
    };
  },
  watch: {
    model() {
      this.setWidth();
    },
    checkAll(v) {
      this.$emit("checkedAll", v);
    },
  },
  mounted() {
    document.addEventListener("scroll", this.onScroll, true);
    window.addEventListener("resize", this.onResize, true);
    this.setWidth();
    this.onResize();
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll, true);
    window.removeEventListener("resize", this.onResize, true);
  },
  computed: {
    getStyleBody() {
      let res = this.style_body;
      if (this.footer) {
        res.bottom = "30px";
      }
      return res;
    },
    calcMinWidth() {
      let w = 0;
      let add = 0;
      for (let el of this.filedsWidth) {
        w = w + parseFloat(el);
        add = add + 4;
      }
      return add + w + "px";
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
    clickCheckbox(event, row, key) {
      if (event.shiftKey) {
        let start = this.lastCheckClick;
        let end = key;
        let dif = end - start;
        if (dif < 0) {
          dif = -dif;
          end = start;
          start = key;
        }
        for (let i = 0; i <= dif; i++) {
          let p = start + i;
          let a = this.data[p];
          a.checked = true;
          this.$set(this.data, p, a);
        }
      } else {
        this.lastCheckClick = key;
        row.checked = !row.checked;
      }
    },
    onClickHeader(field) {
      if (field && field != "checked") {
        this.$emit("sort", field);
      }
    },
    onSelectInput(e) {
      Object.assign(this.filters, e);
      this.$emit("change-filter", this.filters);
    },
    getElArrayByValue(array, field, name) {
      return array.find((x) => x[field] == name);
    },
    getModelByName(name) {
      return this.getElArrayByValue(this.model, "name", name);
    },
    setWidth() {
      this.filedsWidth = [];
      // let hashModel = JSON.stringify(this.model).md5();
      for (let i = 0; i < this.model.length; i++) {
        let width;
        if (this.model[i].width) width = parseFloat(this.model[i].width);
        else width = 100;
        this.$set(this.filedsWidth, i, width);
      }
    },
    onSeparatorMousedown(e, id) {
      if (!this.mousedown.pressBtn) {
        this.mousedown.pressBtn = true;
        this.mousedown.rowId = id;
        this.mousedown.pos = e.clientX;
        this.mousedown.currPos = this.filedsWidth[id];
        document.body.style["user-select"] = "none";
        // if (window.localStorage.getItem("leftSizePozition")) {
        //   this.$root.leftSizePozition = parseInt(
        //     window.localStorage.getItem("leftSizePozition")
        //   );
        // }
      }
    },
    onSeparatorMouseup: function () {
      if (this.mousedown.pressBtn) {
        this.mousedown.pressBtn = false;
        this.mousedown.rowId = null;
        document.body.style["user-select"] = "auto";
      }
    },
    onSeparatorMousemove: function (e) {
      if (this.mousedown.pressBtn) {
        let pos = this.mousedown.pos - e.clientX;
        let wid = this.mousedown.currPos - pos;
        if (wid < minWidth) {
          wid = minWidth;
        }
        // this.filedsWidth[this.mousedown.rowId] = this.filedsWidth[this.mousedown.rowId] - pos
        this.$set(this.filedsWidth, this.mousedown.rowId, wid);
      }
    },
    onScroll(e) {
      let el = this.$refs.body;
      let offset = 200;
      if (e.target == el) {
        if (el.scrollHeight - el.offsetHeight <= el.scrollTop + offset) {
          this.$emit("scrollEnd", e);
        }
      }
    },
    onResize() {
      let height = window.innerHeight;
      let top = this.$refs.table.getBoundingClientRect().top;
      this.tableHeight = height - top - 100;
    },
  },
};
</script>

<style lang="scss">
@mixin table-style(
  $color,
  $borderColor,
  $backgroundColor,
  $backgroundColorSecond,
  $backgroundColorHover
) {
  .f-table-wrapper {
    position: relative;
    height: 100%;
    overflow: auto;
    border: 1px solid $borderColor;
  }
  .f-table {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    box-sizing: border-box;
    background-color: $backgroundColor;
  }
  .f-table-header {
    border-top: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    .f-table-row {
      min-height: 20px;
    }
  }
  .f-table-row {
    display: flex;
    flex-flow: row wrap;
    min-height: 40px;
    border-right: 1px solid $borderColor;
    &.searchable {
      border-top: 1px solid $borderColor;
      height: 30px;
    }
  }
  .f-table-body {
    position: absolute;
    overflow-x: hidden;
    left: 0;
    right: 0;
    bottom: 30px;
    top: 28px !important;
    &.searchable {
      top: 58px !important;
    }
    .f-table-col {
      cursor: pointer;
    }
    .f-table-row.f-table-row-body {
      border-bottom: 1px solid $borderColor;
      background-color: $backgroundColor;
      &:hover {
        background: $backgroundColorHover;
      }
    }
    .f-table-row.f-table-row-body:nth-child(odd) {
      background-color: $backgroundColorSecond;
      &:hover {
        background-color: $backgroundColorHover;
      }
    }
  }
  .f-table-background {
    height: 100% !important;
    //   background: #fff !important;
  }
  .f-table-col {
    padding: 4px 6px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    border-left: 1px solid $borderColor;
    color: $color;
    &.sortable {
      flex-flow: row nowrap;
      justify-content: space-between;
      cursor: pointer;
    }
  }
  .f-table-separator {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8px;
    right: 0;
    z-index: 1;
    margin: 0;
    border: none;
    cursor: col-resize;
  }
  .f-table-footer {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    border-top: 1px solid #d9d9d9;
    background: #eee;
    font-weight: bold;
  }
}

.theme--dark {
  $color: #bdbdbd;
  $borderColor: #808080;
  $backgroundColor: #161616;
  $backgroundColorSecond: lighten($backgroundColor, 3%);
  $backgroundColorHover: lighten($backgroundColor, 10%);
  @include table-style(
    $color,
    $borderColor,
    $backgroundColor,
    $backgroundColorSecond,
    $backgroundColorHover
  );
}
.theme--light {
  $color: #1a1a1a;
  $borderColor: #a3a3a3;
  $backgroundColor: #ffffff;
  $backgroundColorSecond: darken($backgroundColor, 5%);
  $backgroundColorHover: darken($backgroundColor, 10%);
  @include table-style(
    $color,
    $borderColor,
    $backgroundColor,
    $backgroundColorSecond,
    $backgroundColorHover
  );
}
</style>