<template>
  <div class="component__dialog--container">
    <div class="component__dialog--footer"></div>
    <div class="component__dialog--body">
      <div class="component__dialog--message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "Bạn cần nhập đúng định dạng cho trường dữ liệu.",
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
