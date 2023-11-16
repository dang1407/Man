<template>
  <div class="view__container">
    <div class="view__container--header">
      <h1>Cài đặt trong trang</h1>
    </div>
    <div class="view__container--body">
      <div class="view__container--td30">
        <MComboBox
          v-model="dateFormatSelected"
          :listOptions="dateFormatOptions"
          :label="'Định dạng ngày/tháng/năm'"
          @onSelectedComboBoxOption="updateDatePattern"
        ></MComboBox>
      </div>
    </div>
  </div>
</template>

<script>
import APIConfig from "@/js/api/config/apiconfig.js";
import APIErrorHandler from "@/js/api/apierrorhandler.js";
export default {
  inject: ["config"],
  methods: {
    getDateConfigurationsOptionsAsync:
      APIConfig.getDateConfigurationsOptionsAsync,
    errorHandler: APIErrorHandler.errorHandler,
  },
  data() {
    return {
      dateFormatOptions: [],
      dateFormatSelected: this.config?.DatePattern
        ? this.config?.DatePattern
        : "",
    };
  },
  async mounted() {
    console.log(this.config);
    const response = await this.getDateConfigurationsOptionsAsync();
    console.log(response);
    const listOptions = response.data.map((option) => option.DatePattern);
    this.dateFormatOptions = listOptions;
    try {
      const responseConfig = await this.$axios.get("Config");
      console.log(responseConfig);
      this.dateFormatSelected = responseConfig.data.DatePattern;
      // console.log(this.config);
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    console.log(this.config);
  },
  watch: {
    config() {},
  },
};
</script>

<style scoped>
.view__container {
  background-color: #eee;
  height: calc(100vh - 56px);
  padding: 24px;
}

.view__container--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.view__container--body {
  height: calc(100% - 48px);
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  border-radius: 4px;
}

.view__container--td30 {
  width: 30%;
}
</style>
