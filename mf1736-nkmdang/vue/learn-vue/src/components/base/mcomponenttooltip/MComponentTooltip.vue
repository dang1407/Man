<template>
  <div class="">
    <div class="tooltip-icon-box">
      <div class="tooltip-icon"></div>
    </div>
    <div class="tooltip-box">
      {{ tooltip }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tooltip: {
      type: String,
      default: "",
    },
  },
};
</script>
<style></style>
