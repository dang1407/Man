// import axios from "@/js/axios";
// import employeeresource from './employeeresource';
class EmployeeApi {
  constructor() {
    // this.employeeBaseUrlApi = "https://cukcuk.manhnv.net/api/v1/Employees";
  }

  /**
   * Author: Minh Đăng 07/09/2023
   * Feat: Lấy toàn bộ dữ liệu nhân viên
   */
  async getAllEmployees() {
    try {
      this.$emitter.emit("onShowLoading");

      // console.log(this.page, pageSize);
      const response = await this.$axios.get(
        // this.employeeBaseUrlApi
        `/Employees?page=${this.page}&pageSize=${this.pageSize}`
      );
      // console.log(response);

      this.empDataShow = response.data.data;
      this.countEmployees = response.data.countEmployees;
      this.handleAfterGetEmployees();
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      console.log(error);
      this.$emitter.emit(
        "onShowToastMessage",
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .CannotGetEmployees
      );
    }
  }

  /**
   * Lấy ra thông tin các đơn vị
   * Created by: nkmdang (28/09/2023)
   */
  async getDepartmentInformation() {
    try {
      this.$emitter.emit("onShowLoading");
      const response = await this.$axios.get("Departments");
      this.departmentData = response.data;
      this.$emitter.emit("onHideLoading");
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      this.$emitter.emit(
        "onShowToastMessage",
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .CannotGetDepartments
      );
    }
  }

  async searchEmployee(employeeProperty) {
    // const employeeCodePrefix = this.employeeProperty.substring(0, 4);
    // if (this.employeeProperty.substring(0, 4) == "NV-0") {
    //   try {
    //     this.$emitter.emit("onShowLoading");
    //     const response = await this.$axios.get(
    //       `Employees?employeeCode=${this.employeeProperty}`
    //     );
    //     this.empDataShow = [{ ...response.data.data }];

    //     this.countEmployees = response.data.countEmployees;
    //     this.handleAfterGetEmployees();
    //     console.log(response);
    //   } catch {
    //     this.$emitter.emit("onHideLoading");
    //   }
    // } else if (this.employeeProperty.substring(0, 1) == "0") {
    //   try {
    //     this.$emitter.emit("onShowLoading");
    //     const response = await this.$axios.get(
    //       `Employees?page=${this.page}&pageSize=${this.pageSize}&mobile=${this.employeeProperty}`
    //     );

    //     this.empDataShow = [];
    //     this.empDataShow.push(response.data.data);
    //     this.countEmployees = response.data.countEmployees;
    //     this.handleAfterGetEmployees();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   try {
    //     this.$emitter.emit("onShowLoading");
    //     const response = await this.$axios.get(
    //       `Employees?page=${this.page}&pageSize=${this.pageSize}&employeeFullName=${this.employeeProperty}`
    //     );
    //     // console.log(response);
    //     this.empDataShow = response.data.data;
    //     this.countEmployees = response.data.countEmployees;
    //     this.handleAfterGetEmployees();
    //   } catch (error) {
    //     this.$emitter.emit("onHideLoading");
    //   }
    // }

    try {
      this.$emitter.emit("onShowLoading");
      const response = await this.$axios.get(
        `Employees?page=${this.page}&pageSize=${this.pageSize}&employeeProperty=${employeeProperty}`
      );

      this.empDataShow = response.data.data;
      this.countEmployees = response.data.countEmployees;
      this.handleAfterGetEmployees();
      this.$emitter.emit("onHideLoading");
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      console.log(error);
    }
  }

  /**
   * Kiểm tra các trường thông tin rỗng
   * @returns
   * Created by: nkmdang (03/10/2023)
   */
  validateEmptyInput() {
    if (
      !this.empFormData.EmployeeCode ||
      !this.empFormData.DepartmentName ||
      !this.empFormData.FullName
    ) {
      let MissingInputMessage = "";
      if (!this.empFormData.EmployeeCode) {
        this.missingInput.EmployeeCode = true;
        MissingInputMessage += "Mã nhân viên không được để trống.<br>";
      }
      if (!this.empFormData.DepartmentName) {
        this.missingInput.DepartmentName = true;
        MissingInputMessage += "Đơn vị không được để trống.<br>";
      }
      if (!this.empFormData.FullName) {
        this.missingInput.FullName = true;
        MissingInputMessage += "Họ tên không được để trống.<br>";
      }
      // console.log(this.missingInput);
      this.empFormData.GenderName =
        this.$baseEnum.Gender[this.$languageCode][this.empFormData.Gender];

      // this.$emitter.emit(
      //   "setDialogContent",
      //   this.$resource[this.$languageCode].DialogContent.MissingInput
      // );
      const dialogContent =
        this.$resource[this.$languageCode].DialogContent.MissingInput;
      dialogContent.Message = MissingInputMessage;
      this.$emitter.emit("onShowNotificationDialog", dialogContent);
      return false;
    } else {
      return true;
    }
  }

  cleanEmptyString(empFormData) {
    // Lọc các giá trị "" để chuyển thành null tránh lỗi khi
    for (let key in empFormData) {
      if (empFormData[key] === "") {
        empFormData[key] = null;
      }
    }
  }

  validateEmployeeBussiness(empFormData) {
    this.cleanEmptyString(empFormData);
    if (!this.validateEmptyInput(empFormData)) {
      return false;
    }

    // Validate mã nhân viên
    const employeeRegex = /^NV-00[0-9]{4}$/;
    if (!employeeRegex.test(empFormData.EmployeeCode)) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.EmployeeCodeNotValid;
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate Họ tên
    if (empFormData.FullName.length > 100) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.EmployeeCodeNotValid;
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate Ngày sinh và ngày cấp
    // Ngày sinh và ngày cấp đã được componet MDatepicker xử lý chuyển thành DateTime rồi nên không cần xử lý lại nữa
    const now = new Date();
    if (empFormData?.DateOfBirth) {
      const DateOfBirthFormdata = new Date(empFormData.DateOfBirth);
      if (DateOfBirthFormdata > now) {
        // Chuẩn bị nội dung thông báo
        let dialogContent =
          this.globalResourceLanguage.DialogContent.NotValidInputForm;
        dialogContent.Message =
          this.employeeResourceLanguage.DateOfBirthNotInFuture;
        // Mở thông báo
        this.openPopupNotification(
          this.$baseEnum.PopUpType.NotificationDialog,
          dialogContent
        );
        return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
      } else {
        const inputYear = DateOfBirthFormdata.getFullYear();
        const employeeAge = inputYear - now.getFullYear();
        if (!(18 <= employeeAge && employeeAge <= 70)) {
          // Chuẩn bị nội dung thông báo
          let dialogContent =
            this.globalResourceLanguage.DialogContent.NotValidInputForm;
          dialogContent.Message =
            this.employeeResourceLanguage.DateOfBirthNotValid;
          // Mở thông báo
          this.openPopupNotification(
            this.$baseEnum.PopUpType.NotificationDialog,
            dialogContent
          );
        }
      }
    }

    // Validate Ngày cấp
    if (empFormData?.PICreatedDate) {
      const PICreatedDateFormdata = new Date(empFormData.PICreatedDate);
      if (PICreatedDateFormdata > now) {
        // Chuẩn bị nội dung thông báo
        let dialogContent =
          this.globalResourceLanguage.DialogContent.NotValidInputForm;
        dialogContent.Message =
          this.employeeResourceLanguage.PICreatedDateNotInFuture;
        // Mở thông báo
        this.openPopupNotification(
          this.$baseEnum.PopUpType.NotificationDialog,
          dialogContent
        );
        return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
      }
    }

    // Validate Số CMND chỉ bao gồm các số
    const digitRegex = /^\d+$/;
    if (
      empFormData?.PersonalIdentification &&
      !digitRegex.test(empFormData?.PersonalIdentification)
    ) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.PersonalIdentificationNotValid;
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    /** VALIDATE MAX LENGTH */
    const maxLengthField = 255;

    // Validate max length cho chức danh
    if (
      !this.validateMaxlength(
        empFormData,
        "PositionName",
        "Chức danh",
        maxLengthField
      )
    ) {
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate max length cho địa chỉ
    if (
      !this.validateMaxlength(empFormData, "Address", "Địa chỉ", maxLengthField)
    ) {
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate max length cho Tài khoản ngân hàng
    if (
      !this.validateMaxlength(
        empFormData,
        "BankAccount",
        "Tài khoản ngân hàng",
        maxLengthField
      )
    ) {
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate max length cho Tên ngân hàng
    if (
      !this.validateMaxlength(
        empFormData,
        "BankName",
        "Tên ngân hàng",
        maxLengthField
      )
    ) {
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate max length cho Chi nhánh ngân hàng
    if (
      !this.validateMaxlength(
        empFormData,
        "BankBranch",
        "Chi nhánh",
        maxLengthField
      )
    ) {
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }
    /** VALIDATE SỐ ĐIỆN THOẠI */
    const phoneNumberRegex = /^[\+0-9][0-9]{9, }/;
    if (empFormData?.Mobile && !phoneNumberRegex.test(empFormData.Mobile)) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.PhoneNumberNotValid("Điện thoại di động");
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    // Validate điện thoại cố định
    if (
      empFormData?.LandLinePhone &&
      !phoneNumberRegex.test(empFormData.LandLinePhone)
    ) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.PhoneNumberNotValid("Điện thoại cố định");
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false; // Kết thúc kiểm tra nghiệp vụ (nghiệp vụ trả về từng cái)
    }

    return true;
  }

  /**
   * Hàm validate độ dài thuộc tính
   * @param {Object} empFormData FormData thông tin nhân viên để fetch API
   * @param {String} attr Thuộc tính nhân viên trong object FormData
   * @param {String} attrName Tên thuộc tính của nhân viên trên form
   * @param {int} maxLength Độ dài tối đa của trường dữ liệu
   * @returns false nếu không hợp lệ, true nếu hợp lệ
   *
   * Created by: nkmdang 05/10/2023
   */
  validateMaxlength(empFormData, attr, attrName, maxLength) {
    if (empFormData[attr] && empFormData[attr].length > maxLength) {
      // Chuẩn bị nội dung thông báo
      let dialogContent =
        this.globalResourceLanguage.DialogContent.NotValidInputForm;
      dialogContent.Message =
        this.employeeResourceLanguage.FieldNotTooLong(attrName);
      // Mở thông báo
      this.openPopupNotification(
        this.$baseEnum.PopUpType.NotificationDialog,
        dialogContent
      );
      return false;
    }
    return true;
  }
  /**
   * Hàm hiển thị thông báo khi cần thiết
   * @param {String} popUpType Loại thông báo sẽ hiển thị
   * @param {Object} content Nội dung của thông báo
   *
   * Created by: nkmdang 05/10/2023
   */
  openPopupNotification(popUpType, content) {
    if (popUpType == this.$baseEnum.PopUpType.NotificationDialog) {
      this.$emitter.emit("onShowNotificationDialog", content);
    } else if (popUpType == this.$baseEnum.PopUpType.ToastMessage) {
      this.$emitter.emit("onShowToastMessage", content);
    }
  }

  /**
   * Author: Minh Đăng 4/9/2023
   * Feat: Thêm mới 1 nhân viên (kiểm tra sơ bộ dữ liệu đầu vào, post lên server,... )
   */
  async createOneEmp() {
    // console.log(this.empFormData);
    if (!this.validateEmployeeBussiness(this.empFormData)) {
      return;
    }
    try {
      this.$emitter.emit("onShowLoading");
      let newEmployeeFormData = this.empFormData;
      // console.log(this.empFormData);
      if (newEmployeeFormData.Gender === "") {
        newEmployeeFormData.Gender = null;
      } else {
        newEmployeeFormData.Gender = parseInt(newEmployeeFormData.Gender);
      }
      let newEmpFormData = this.empFormData;
      if (newEmpFormData.DateOfBirth == "") {
        newEmpFormData.DateOfBirth = null;
      }

      if (newEmpFormData.PIDateCreated == "") {
        newEmpFormData.PIDateCreated = null;
      }
      const response = await this.$axios.post(
        // this.employeeBaseUrlApi,
        "/Employees",
        newEmpFormData
      );
      // console.log(response);
      this.$emitter.emit("onSaveOneEmployeeSuccess");

      this.onCloseEmpDetail();
      this.$emitter.emit("onHideLoading");
      if (response.status == 201) {
        // this.$emitter.emit(
        //   "setToastMessageContent",
        //   this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
        //     .AddSuccess
        // );
        // this.$emitter.emit(
        //   "createNewToastMessage",
        //   this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
        //     .AddSuccess
        // );
        this.$emitter.emit(
          "onShowToastMessage",
          this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
            .AddSuccess
        );
      }
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      console.log(error);
      let dialogContent =
        this.$resource[this.$languageCode].DialogContent.Error;
      // dialogContent.Message = error.response.data?.Errors[0]?.ErrorMessage
      //   ? error.response.data?.Errors[0]?.ErrorMessage
      //   : error.response.data.UserMessage;
      if (error.response.data.Errors) {
        dialogContent.Message = error.response.data.Errors[0].ErrorMessage;
      } else {
        dialogContent.Message = error.response.data.UserMessage;
      }
      dialogContent.Icon = "icon__bigwarning";
      // this.$emitter.emit("setDialogContent", dialogContent);
      this.$emitter.emit("onShowNotificationDialog", dialogContent);
    }
  }
  /**
   * Author: Minh Đăng 4/9/2023
   * Feat: Thêm mới 1 nhân viên (kiểm tra sơ bộ dữ liệu đầu vào, post lên server,... )
   */
  async createOneEmpAndSaveNew() {
    // console.log(this.empFormData);
    // Kiểm tra các trường bắt buộc bị rỗng
    if (!this.validateEmptyInput()) {
      return;
    }
    try {
      this.$emitter.emit("onShowLoading");
      let newEmployeeFormData = this.empFormData;
      // console.log(this.empFormData);
      if (newEmployeeFormData.Gender === "") {
        newEmployeeFormData.Gender = null;
      } else {
        newEmployeeFormData.Gender = parseInt(newEmployeeFormData.Gender);
      }
      let newEmpFormData = this.empFormData;
      if (newEmpFormData.DateOfBirth == "") {
        newEmpFormData.DateOfBirth = null;
      }

      if (newEmpFormData.PIDateCreated == "") {
        newEmpFormData.PIDateCreated = null;
      }
      const response = await this.$axios.post(
        // this.employeeBaseUrlApi,
        "/Employees",
        newEmpFormData
      );
      // console.log(response);
      this.$emitter.emit("onSaveOneEmployeeSuccess");
      this.$emitter.emit("onHideLoading");
      if (response.status == 201) {
        // this.$emitter.emit(
        //   "setToastMessageContent",
        //   this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
        //     .AddSuccess
        // );
        // this.$emitter.emit(
        //   "createNewToastMessage",
        //   this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
        //     .AddSuccess
        // );
        this.$emitter.emit(
          "onShowToastMessage",
          this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
            .AddSuccess
        );
      }
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      console.log(error);
      let dialogContent =
        this.$resource[this.$languageCode].DialogContent.Error;
      dialogContent.Message = error.response.data.UserMessage;
      dialogContent.Icon = "icon__bigwarning";
      this.$emitter.emit("onShowNotificationDialog", dialogContent);
    }
  }
  /**
   * Author: Minh Đăng 07/09/2023
   * Feat: Thay đổi một nhân viên
   */
  async changeOneEmp(id) {
    // Kiểm tra các trường bắt buộc bị rỗng
    if (!this.validateEmptyInput()) {
      return;
    }
    try {
      this.$emitter.emit("onShowLoading");
      let newEmployeeFormData = this.empFormData;
      // console.log(this.empFormData);
      if (newEmployeeFormData.Gender === "") {
        newEmployeeFormData.Gender = null;
      } else {
        newEmployeeFormData.Gender = parseInt(newEmployeeFormData.Gender);
      }
      // console.log(this.empFormData);
      const response = await this.$axios.put(
        // this.employeeBaseUrlApi,
        `/Employees/${id}`,
        this.empFormData
      );
      // console.log(response);
      this.$emitter.emit("onSaveOneEmployeeSuccess");

      this.onCloseEmpDetail();
      this.$emitter.emit("onHideLoading");
      if (response.status == 200) {
        // this.$emitter.emit(
        //   "setToastMessageContent",
        //   this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
        //     .AddSuccess
        // );
        // this.$emitter.emit("createNewToastMessage");
        this.$emitter.emit(
          "onShowToastMessage",
          this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
            .UpdateSuccess
        );
      }
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      console.log(error);
      let dialogContent =
        this.$resource[this.$languageCode].DialogContent.Error;
      dialogContent.Message =
        error.response?.data?.userMsg || dialogContent.Message;
      dialogContent.Icon = "icon__error";
      this.$emitter.emit("setDialogContent", dialogContent);
      this.$emitter.emit("onShowNotificationDialog");
    }
  }

  /**
   * Author: NKMDANG 12/09/2023
   * Feat: Lấy mã nhân viên mới
   */
  async getNewEmployeeCode() {
    try {
      this.$emitter.emit("onShowLoading");
      const response = await this.$axios.get("Employees/NewEmployeeCode");
      this.$emitter.emit("onHideLoading");
      // if (response.status == 200) {
      // console.log(response.data);
      // this.empFormData.EmployeeCode = response.data;
      // }
      return response;
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      this.$emitter.emit(
        "onShowToastMessage",
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .CannotGetNewEmployeeCode
      );
      console.log(error);
    }
  }

  /**
   * Author: nkmdang (13/09/2023)
   * Feat: Xóa 1 nhân viên theo id
   */
  async deleteOneEmployeeById(id) {
    this.isShowEmpSelectFunc = false;
    try {
      console.log(id);
      this.$emitter.emit("onShowLoading");
      const response = await this.$axios.delete(`/Employees/${id}`);
      console.log(response);
      if (response.status == 200) {
        this.$emitter.emit(
          "onShowToastMessage",
          this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
            .DeleteSuccess
        );
      }
      this.$emitter.emit("onHideLoading");
      await this.getAllEmployees();
    } catch (error) {
      this.$emitter.emit("onHideLoading");
      this.$emitter.emit(
        "onShowToastMessage",
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .CannotDeleteEmployee
      );
      console.log(error);
    }
  }

  /**
   * Hàm xóa nhiều nhân viên theo Id
   * @param {Array} ids Mảng các EmployeeId của các nhân viên cần xóa
   * Created by: nkmdang (03/10/2023)
   */
  async deleteManyByListIdAsync(ids) {
    this.isSelectAllEmp = false;
    this.isEmpBatchExe = false;
    this.numEmpSelected = 0;
    this.objectEmpSelectedCode = {};
    try {
      // Làm sạch mảng id
      const cleanIds = ids.filter((id) => id != null);
      // console.log(cleanIds);
      this.$emitter.emit("onShowLoading");
      await this.$axios.delete("Employees", {
        data: cleanIds,
      });
      await this.getAllEmployees();
      this.endCallApiToastMessage(
        this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
          .DeleteManySuccess
      );
      this.arrayEmployeeIdsDelete = {};
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Kết thúc gọi API, đóng loading, hiển thị toast message thành công
   * @param {Object{Title, Icon, Message}} dialogContent
   * Created by: nkmdang (26/09/2023)
   */
  endCallApiToastMessage(toastMessageContent) {
    this.$emitter.emit("onHideLoading");
    // this.$emitter.emit("setToastMessageContent", toastMessageContent);
    this.$emitter.emit("onShowToastMessage", toastMessageContent);
  }

  /**
   * Kết thúc gọi API, đóng loading, hiển thị dialog báo lỗi
   * @param {Object} dialogContent
   * Created by: nkmdang (26/09/2023)
   */
  endCallApiDialog(dialogContent) {
    this.$emitter.emit("onHideLoading");
    this.$emitter.emit("setDialogContent", dialogContent);
    this.$emitter.emit("onShowDialog");
  }

  /**
   * Hàm thay đổi số bản ghi nhân viên trên một trang
   * @param {Integer} pageSize - Số bản ghi nhân viên trên một trang
   * Created by: nkmdang (03/10/2023)
   */
  async changePageSize(pageSize) {
    if (pageSize != this.pagepageSize) {
      this.page = 1;
    }
    this.pageSize = pageSize;
    this.$router.push(`/employees?page=${this.page}&pageSize=${this.pageSize}`);
    await this.getAllEmployees();
    // this.reloadViewPage();
  }

  /**
   *  Hàm thay đổi số thự tự trang đang xem
   * @param {Integer} page Số thự tự trang đang xem
   * @returns Promise<void>
   * Created by: nkmdang (03/10/2023)
   */
  async changePage(page) {
    // console.log(page);
    if (isNaN(page)) {
      return;
    }
    this.page = page;
    this.pageSelected = page;
    this.$router.push(`/employees?page=${this.page}&pageSize=${this.pageSize}`);
    await this.getAllEmployees();
    // this.reloadViewPage();
  }

  /**
   * Chuyển sang trang sau
   * Created by: nkmdang (03/10/2023)
   */
  async nextPage() {
    if (this.countPages.length) {
      if (this.page < this.countPages.length) {
        this.page = this.page + 1;
      }
    } else if (this.page < this.countPages) {
      this.page = this.page + 1;
    }
    this.pageSelected = this.page;
    await this.getAllEmployees();
  }

  /**
   * Chuyển sang trang trước
   * Created by: nkmdang (03/10/2023)
   */
  async prevPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
    }
    this.pageSelected = this.page;
    await this.getAllEmployees();
  }

  /**
   * Xử lý phân trang sau khi lấy toàn bộ dữ liệu, xóa các nhân viên được chọn
   * Created by: nkmdang (03/10/2023)
   */
  handleAfterGetEmployees() {
    this.countPages = Math.ceil(this.countEmployees / this.pageSize);
    this.page = parseInt(this.page);
    this.countPages = parseInt(this.countPages);
    if (this.countPages > 6) {
      if (this.page <= 3) {
        let newCountPages = [
          1,
          2,
          3,
          4,
          "...",
          this.countPages - 1,
          this.countPages,
        ];
        this.countPages = newCountPages;
      } else if (3 < this.page && this.countPages - this.page >= 3) {
        let newCountPages = [
          1,
          "...",
          this.page - 1,
          this.page,
          this.page + 1,
          "...",
          this.countPages,
        ];
        this.countPages = newCountPages;
      } else {
        let newCountPages = [
          1,
          2,
          "...",
          this.countPages - 3,
          this.countPages - 2,
          this.countPages - 1,
          this.countPages,
        ];
        this.countPages = newCountPages;
      }
    }
    this.$emitter.emit("onHideLoading");
  }

  async exportExcelCurrentPage(page, pageSize, employeeProperty) {
    try {
      const response = await this.$axios.get(
        `Employees/EmployeesExcel?page=${page}&pageSize=${pageSize}&employeeProperty=${employeeProperty}`,
        { responseType: "blob" }
      );
      // Tạo một Blob từ dữ liệu trả về từ API
      const blob = new Blob([response.data]);

      // Tạo URL cho Blob
      const url = window.URL.createObjectURL(blob);

      // Lấy thẻ <a> tải xuống và đặt href là URL của Blob
      this.$refs.downloadLink.href = url;

      // Đặt tên tệp Excel mà bạn muốn khi người dùng tải về
      this.$refs.downloadLink.download = "Danh sách nhân viên.xlsx";

      // Simulate a click to trigger the download
      this.$refs.downloadLink.click();

      // Giải phóng URL để tránh rò rỉ bộ nhớ
      window.URL.revokeObjectURL(url);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new EmployeeApi();
