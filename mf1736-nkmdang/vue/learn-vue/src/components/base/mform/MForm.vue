<template>
  <div class="mform--container">
    <div class="mform--box">
      <header class="mform--head flex">
        <div class="mform--title flex">
          <h1>{{ title }}</h1>
        </div>
        <div class="mform--close-box flex-center">
          <div class="icons-box relative" style="margin-right: 10px">
            <div class="mform--help icons"></div>

            <div class="tooltip-cont">
              <div class="tooltip-icon-box">
                <div class="tooltip-icon"></div>
              </div>
              <div class="tooltip-box" style="width: 70px">Giúp (F1)</div>
            </div>
          </div>
          <div class="icons-box relative" @click="closeForm">
            <div class="mform--close icons"></div>

            <a class="tooltip-cont">
              <div class="tooltip-icon-box">
                <div class="tooltip-icon"></div>
              </div>
              <div class="tooltip-box" style="width: 80px">Đóng (ESC)</div>
            </a>
          </div>
        </div>
      </header>

      <main class="mform--body">
        <slot name="MFormBody"></slot>
      </main>

      <footer class="mform--footer">
        <slot name="MFormFooter"></slot>
      </footer>
    </div>
  </div>
</template>
<script>
// import { onMounted } from 'vue';
// import axios from 'axios';

export default {
  props: ["title", "closeForm"],
  methods: {
    pressEscCloseForm(event) {
      console.log(event.key);
      if (event.key == "Escape") {
        this.closeForm();
      }
    },
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style scoped>
@import url("./mform.css");
</style>
