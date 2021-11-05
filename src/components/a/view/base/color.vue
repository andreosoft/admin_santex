<template>
  <div
    style="height: 16px; width: 100px"
    :style="{ backgroundColor: value }"
  ></div>
</template>

<script>
export default {
  props: {
    value: String,
  },
};
</script>