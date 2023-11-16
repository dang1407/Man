<template>
  <div class="fixed-container">
    <div class="dialog-cont">
      <div class="dialog-titlebox">
        <div class="dialog-title">
          <h1>{{ dialogContent.Title }}</h1>
        </div>
        <div class="dialog-closebox" @click="onCancel" :tabindex="4">
          <div class="icons icon__miniclose"></div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="dialog-desc-icon">
          <div class="icons" :class="dialogContent.Icon"></div>
        </div>
        <div class="dialog-mes">
          {{ dialogContent.Message }}
        </div>
      </div>

      <div class="dialog-buttonbox">
        <div class="flex" style="justify-content: space-between; width: 100%">
          <div @click="onCancel">
            <MButton class="bg-white" :tabindex="3">{{
              this.$resource[this.$languageCode].Cancel
            }}</MButton>
          </div>
          <div class="flex">
            <div class="dialog-button__cancel" @click="onNot">
              <MButton class="bg-white" :tabindex="2">{{
                this.$resource[this.$languageCode].Not
              }}</MButton>
            </div>
            <div class="dialog-button_accept" @click="onAccept">
              <MButton :tabindex="1" :focus="true">{{
                this.$resource[this.$languageCode].Accept
              }}</MButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dialogContent"],
  beforeMount() {},
  methods: {
    onCancel() {
      this.$emit("onCancelOptionDialog");
    },
    onAccept() {
      this.$emit("onAcceptOptionDialog");
    },
    onNot() {
      this.$emit("onNotOptionDialog");
    },
  },
};
</script>
<style scoped>
@import url("./dialog.css");
/* .fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}

.dialog-cont {
  width: 450px;
  min-height: 173px;
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
}

.dialog-titlebox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}

.dialog-closebox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon__miniclose {
  background-position: -1177px -362px;
  width: 13px;
  height: 12px;
}

.dialog-content {
  display: flex;
}

.dialog-desc-icon {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.dialog-buttonbox {
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
}

.dialog-button__cancel {
  margin-right: 8px;
}

.icon__bigwarning {
  background-position: -598px -463px;
  width: 36px;
  height: 37px;
} */
</style>
