class CustomerListHandler {
  constructor() {}
  /**
   * Author: Minh Đăng
   * Function: Đóng form  thêm mới nhân viên 20/8/2023
   * */
  hideEmpDetail() {
    this.isShowEmpDetail = false;
    this.isEmpSelectFuncId = false;
  }
  /**
   * Author: Minh Đăng
   * Function: Mở form  thêm mới nhân viên 20/8/2023
   * */
  showEmpDetail() {
    this.customerDetailTitle = "Thêm mới khách hàng";
    this.$router.push("/employees/form");
    // this.isShowEmpDetail = true;
    // this.empDetailTitle = "Thêm mới nhân viên";
    // this.empDetail = {};
  }

  /**
   * Author: Minh Đăng
   * Function: Mở form  thêm mới nhân viên 20/8/2023
   * */
  showChangeCustomerDetail(customer, index) {
    this.customerDetail = customer;
    // this.isShowEmpDetail = true;
    this.customerDetailTitle = "Thông tin khách hàng";
    this.indexCustomerToChange = index;
    // console.log(customer);
    this.$router.push(`/customers/form/${customer.CustomerId}`);
    // this.$emitter.emit("empDetailChanged", this.customerDetail);
  }

  /**
   * Author: Minh Đăng
   * Function: Mở phần chọn chức năng với nhân viên 20/8/2023
   * */
  clickCustomerSelectFunc(index) {
    // e.stopPropagation();
    // console.log(index);
    const prevValue = this.isShowCustomerSelectFuncArray[index];
    this.isShowCustomerSelectFuncArray = new Array(
      this.isShowCustomerSelectFuncArray.length
    ).fill(false);
    this.isShowCustomerSelectFuncArray[index] = prevValue;
    this.isShowCustomerSelectFuncArray[index] =
      !this.isShowCustomerSelectFuncArray[index];
    this.customerSelectFuncId = index;
  }

  /**
   * Author: Minh Đăng
   * Function: Ẩn phần chọn chức năng với nhân viên  20/8/2023
   * */
  hideCustomerSelectFunc(customerSelectFuncId) {
    // console.log(customerSelectFuncId);
    this.isShowCustomerSelectFuncArray[customerSelectFuncId] = false;
    customerSelectFuncId = -1;
  }

  /**
   * Author: Minh Đăng
   * Function: Chọn và bỏ chọn tất cả nhân viên trong bảng 24/8/2023
   * */
  selectAllCustomer() {
    this.numCustomerSelected = this.numCustomersDataShow;
    this.isCustomerSelected = new Array(this.numCustomersDataShow).fill(true);
    this.isSelectAllCustomer = true;
    this.checkAllCustomerClass = "tickv-circle";
  }

  /**
   * Author: Minh Đăng
   * Function: Chọn hoặc bỏ chọn 1 nhân viên 24/8/2023
   * @param(id)
   * */
  selectOneCustomer(index) {
    // console.log(index);
    this.isCustomerSelected[index] = !this.isCustomerSelected[index];
    // Đếm số nhân viên đang được chọn
    this.numCustomerSelected = this.isCustomerSelected.reduce(function (
      prevNum,
      currentValue
    ) {
      return currentValue ? prevNum + 1 : prevNum;
    },
    0);

    // Nếu tất cả nhân viên được chọn
    if (this.numCustomerSelected === this.numCustomersDataShow) {
      this.isSelectAllCustomer = true;
      this.checkAllCustomerClass = "tickv-circle";
    }
    if (this.numCustomerSelected < this.numCustomersDataShow) {
      this.isSelectAllCustomer = false;
    }
    if (this.numCustomerSelected >= 2 && !this.isSelectAllCustomer) {
      this.isCustomerBatchExe = true;
      this.checkAllCustomerClass = "ti-minus";
      // this.isSelectAllCustomerCheckboxChecked = true;
    } else if (this.numCustomerSelected <= 1) {
      this.isCustomerBatchExe = false;
      this.isSelectAllCustomer = false;
      this.checkAllCustomerClass = "";
    }
  }

  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Bỏ chọn tất cả nhân viên
   */
  unselectedAllCustomer() {
    this.isSelectAllCustomer = false;
    this.isCustomerBatchExe = false;
    this.isCustomerSelected = new Array(this.isCustomerSelected.length).fill(
      false
    );
    this.numCustomerSelected = 0;
  }
  /**
   * Author: Minh Đăng 24/08/2023
   * Feat: Đóng thông báo dialog
   */
  closeNotificationDialog() {
    this.isShowNotificationDialog = false;
  }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Xử lý error khi request axios bị lỗi (400, 500)
   * @param {*} error
   */
  axiosPosCustomerErrorHandler(error) {
    this.isLoading = false;
    console.log(error);
    switch (error.response.status) {
      case 500:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[
            this.$languageCode
          ].DialogContent.CustomerForm.ErrorInput.InvalidField;
        this.dialogContent.Message = error.response.data.userMsg;
        // console.log(this.dialogContent)
        break;
      case 400:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[
            this.$languageCode
          ].DialogContent.CustomerForm.ErrorInput.InvalidField;
        this.dialogContent.Message = error.response.data.userMsg;
        // console.log(this.dialogContent)
        break;
    }
  }
  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Hiển thị IsLoading
   */
  showIsLoading() {
    this.isLoading = true;
  }
  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Hiển thị IsLoading
   */
  hideIsLoading() {
    this.isLoading = false;
  }
  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Xử lý lỗi khi delete khách hàng theo ID
   */
  axiosDeleteCustomerErrorHandler() {
    this.dialogContent = "";
  }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Xóa khách hàng theo CustomerId
   */
  async deleteCustomerById(CustomerId) {
    try {
      this.showIsLoading();
      await this.$axios.DELETE(
        `https://cukcuk.manhnv.net/api/v1/customers/${CustomerId}`
      );
      this.hideIsLoading();
    } catch (error) {
      this.axiosErrorHandler(error);
    }
  }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Xóa khách hàng theo CustomerId (khóa chính)
   */
  async deleteByEntityId(CustomerId) {
    try {
      const respone = await this.$axios.delete(
        `https://cukcuk.manhnv.net/api/v1/customers/${CustomerId}`
      );
      this.axiosSuccessHandler(respone);
    } catch (error) {
      this.axiosErrorHandler(error);
    }
  }

  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Hiển thị isLoading và kiểm tra đầu vào trước khi post customer
   */
  beforePostCustomer() {
    // Hiển thị loading
    this.isLoading = true;

    // Kiểm tra đầu vào không rỗng
    if (
      this.customerFormData.CustomerCode == "" ||
      this.customerFormData.FullName == "" ||
      this.customerFormData.PhoneNumber == ""
    ) {
      this.isShowNotificationDialog = true;
      // console.log(this.$resource[this.$languageCode].DialogContent.CustomerForm.ErrorInput.MissingRequiredField)
      this.dialogContent =
        this.$resource[
          this.$languageCode
        ].DialogContent.CustomerForm.ErrorInput.MissingRequiredField;
      this.isLoading = false;
      return false;
    } else return true;
  }
  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Ẩn isLoading và hiển thị toast message thành công sau khi pos thành công customer
   */
  afterPostCustomer() {
    this.isShowToastMessage = true;
    this.toastMesContent =
      this.$resource[this.$languageCode].ToastMesContent.Success;
    setTimeout(this.closeToastMessage, 5000);
    this.isLoading = false;
  }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Cất 1 khách hàng
   */
  async saveNewCustomer() {
    const respone = await this.$axios.POST(
      "https://cukcuk.manhnv.net/api/v1/customers",
      this.customerFormData,
      this.axiosPosCustomerErrorHandler,
      this.beforePostCustomer,
      this.afterPostCustomer
    );
    return respone;
  }
  // async saveNewCustomer() {
  //   try {
  //     // Hiển thị loading
  //     this.isLoading = true;

  //     // Kiểm tra đầu vào không rỗng
  //     if (
  //       this.customerFormData.CustomerCode == "" ||
  //       this.customerFormData.FullName == "" ||
  //       this.customerFormData.PhoneNumber == ""
  //     ) {
  //       this.isShowNotificationDialog = true;
  //       // console.log(this.$resource[this.$languageCode].DialogContent.CustomerForm.ErrorInput.MissingRequiredField)
  //       this.dialogContent =
  //         this.$resource[
  //           this.$languageCode
  //         ].DialogContent.CustomerForm.ErrorInput.MissingRequiredField;
  //       this.isLoading = false;
  //       return;
  //     }

  //     // Gửi request lên server
  //     const respone = await this.$axios.post(
  //       "https://cukcuk.manhnv.net/api/v1/customers",
  //       this.customerFormData
  //     );
  //     console.log(respone);

  //     // Thực hiện thành công và hiển thị toast message
  //     if (respone.status < 300) {
  //       this.isShowToastMessage = true;
  //       this.toastMesContent =
  //         this.$resource[this.$languageCode].ToastMesContent.Success;
  //       setTimeout(this.closeToastMessage, 5000);
  //     }
  //     this.isLoading = false;

  //     // this.$router.push("/customerlist")
  //   } catch (error) {
  //     this.axiosPosCustomerErrorHandler(error);
  //   }
  //   console.log(this.customerFormData);
  // }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Hiển thị toast message thông báo thành công
   * @param {*} respone
   */
  axiosSuccessHandler(respone) {
    if (respone.status < 300) {
      this.isShowToastMessage = true;
      this.toastMesContent =
        this.$resource[this.$languageCode].ToastMesContent.Success;
    }
  }
  /**
   * Author: Minh Đăng 31/08/2023
   * Feat: Đóng toast message
   */
  closeToastMessage() {
    this.isShowToastMessage = false;
  }
  /** Author: Minh Đăng
   * Feat: Ẩn toast message 20/8/2023
   * */
  hideToastMessage() {
    this.isShowToastMessage = false;
    this.$router.push("/customers");
  }
  /** Author: Minh Đăng
   * Feat: Đóng form  thêm mới nhân viên 20/8/2023
   * */
  closeCustomerForm() {
    // this.clickClose();
    this.$router.push("/customers");
  }

  /**GET dữ liệu từ API, kết hợp xử lý lỗi */
}
export default new CustomerListHandler();
