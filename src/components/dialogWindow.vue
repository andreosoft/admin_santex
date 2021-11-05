<template>
  <v-dialog :value="value" @input="$emit('input')" :max-width="width">
    <v-card>
      <v-card-title v-if="$slots.title">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text class="py-10">
        <div class="text-center">
          <slot />
        </div>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn @click="$emit('input')">Закрыть</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    width: {
      type: Number,
      default: 400,
    },
  },
};
</script>