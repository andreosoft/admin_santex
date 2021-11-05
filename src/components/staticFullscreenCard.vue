<template>
  <div class="pa-2">
    <v-card>
      <v-card-title>
        <slot name="title"></slot><v-spacer />
        <div class="fullscreen_card__actions">
          <slot name="actions"></slot>
        </div>
      </v-card-title>
      <v-card-text :style="{ height: contentHeight + 'px' }">
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { staticFullHeight } from "./mixings";

export default {
  mixins: [staticFullHeight],
};
</script>

<style lang="scss">
.fullscreen_card__actions .v-btn {
  margin-left: 5px;
}
</style>