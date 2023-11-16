<template>
  <button class="m-btn" :tabindex="tabindex" ref="mbuttonRef">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    tabindex: {
      default: "",
    },
    focus: {
      default: "",
    },
  },
  mounted() {
    if (this.focus == true) {
      this.$refs.mbuttonRef.focus();
    }
  },
};
</script>
<style scoped>
@import url(./mbutton.css);

.bg-white {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #e0e0e0 !important;
}

.bg-white:hover {
  background-color: #ddd !important;
}

.mr-8 {
  margin-right: 8px;
}
</style>
