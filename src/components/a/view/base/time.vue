<template>
  <span>{{ time }}</span>
</template>

<script>
export default {
    props: {
        value: String
    },
    computed: {
      time() {
        const t = this.value.split(':')
        return t[0] + ":" + t[1]
      }
    }
}
</script>