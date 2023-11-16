class APIErrorHandler {
  errorHandler(error, dialogContent) {
    const status = error.response.status;
    if (400 <= status && status < 500) {
      this.$emitter.emit("onShowToastMessage", dialogContent);
    }
  }
}

export default new APIErrorHandler();
