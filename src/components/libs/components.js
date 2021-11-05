import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
    methods: {
        getComponentName(type) {
          return "a-view-table-" + type;
        },
        componentExist(type) {
          const componentName = upperFirst(
            camelCase(
              this.getComponentName(type)
                .replace(/^\.\//, "")
                .replace(/\.\w+$/, "")
            )
          );
          return this.$root.$options.components[componentName] ? true : false;
        },
      },
}