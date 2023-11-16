<template>
  <div class="fixed-container">
    <div class="dialog-cont">
      <div class="dialog-titlebox">
        <div class="dialog-title">
          <h1>{{ dialogContent.Title }}</h1>
        </div>
        <div class="dialog-closebox" @click="onClose">
          <div class="icons icon__miniclose"></div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="dialog-desc-icon">
          <div class="icons" :class="dialogContent.Icon"></div>
        </div>
        <div class="dialog-mes" v-html="dialogContent.Message"></div>
      </div>

      <div class="dialog-buttonbox">
        <!-- <div class="dialog-button__cancel" @click="onClose">
          <MButton class="bg-white">{{ this.$resource[this.$languageCode].Cancel }}</MButton>
        </div> -->
        <div class="dialog-button_accept" @click="onClose">
          <MButton>{{ this.$resource[this.$languageCode].Accept }}</MButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MButton from "../mbutton/MButton.vue";

export default {
  props: ["dialogContent", "onClose"],
  beforeMount() {},
  components: { MButton },
};
</script>
<style scoped>
@import url("./dialog.css");
</style>
