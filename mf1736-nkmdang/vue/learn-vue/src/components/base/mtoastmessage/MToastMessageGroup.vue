<template>
  <div class="toast__group">
    <MToastMessage
      v-for="(toastMessageContent, index) in toastMessageContents"
      :key="index"
      :toastMesContent="toastMessageContent"
    ></MToastMessage>
    <!-- <m-toast-message
      :toastMesContent="
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .AddSuccess
      "
    ></m-toast-message> -->
  </div>
</template>

<script>
import MToastMessage from "./MToastMessage.vue";
export default {
  components: { MToastMessage },
  props: ["toastMessageContents"],
  data() {
    return {
      isShowToastMessageGroup: false,
    };
  },
  watch: {
    toastMessageContents() {
      if (this.toastMessageContents.length > 0) {
        this.isShowToastMessageGroup = true;
      } else {
        this.isShowToastMessageGroup = false;
      }
      // console.log(this.toastMessageContents);
    },
  },
};
</script>
<style>
.toast__group {
  position: fixed;
  right: 20px;
  bottom: 10px;
  min-width: 450px;
  max-width: 650px;
  min-height: 1px;
  display: flex;
  flex-direction: column;

  z-index: 999;
  /* background-color: #ccc; */
}
</style>
