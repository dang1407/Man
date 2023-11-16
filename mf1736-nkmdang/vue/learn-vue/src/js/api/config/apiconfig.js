class APIConfig {
  constructor(apiErrorHandler) {
    this.apiErrorHandler = apiErrorHandler;
  }

  setAPIErrorHandler(apiErrorHandler) {
    this.apiErrorHandler = apiErrorHandler;
  }
  /**
   * Hàm lấy thông tin cấu hình ngày tháng
   * @returns Thông tin ngày tháng lấy được hoặc error xảy ra
   *
   * Created By: nkmdang 08/10/2023
   */
  async getDateConfigurationsOptionsAsync() {
    try {
      this.$emitter.emit("onShowLoading");
      const response = await this.$axios.get("DateConfigurations");
      this.$emitter.emit("onHideLoading");
      return response;
    } catch (error) {
      console.log(error);
      this.$emitter.emit("onHideLoading");
      const dialogContent =
        this.$resource[this.$languageCode].ToastMessageContent
          .CannotGetDateConfiguration;
      // this.$emitter.emit("onShowToastMessage", dialogContent);
      this.apiErrorHandler.errorHandler(error, dialogContent);
      return error;
    }
  }

  async updateDatePatternAsync(datePattern) {
    try {
    } catch (error) {}
  }
}

export default new APIConfig();
