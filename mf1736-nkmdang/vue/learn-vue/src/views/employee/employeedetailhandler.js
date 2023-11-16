class EmployeeDetailHandler {
  handleEmployeeFormKeyDown(e) {
    if (e.key === "Escape") {
      this.onCloseEmpDetail();
    }
  }

  /**
   * Author: Minh Đăng 07/09/2023
   * Feat: Bấm nút cất chung cho form, type = "add" => thêm mới nhân viên,
   */
  async clickSave(emp) {
    if (
      this.formMode === this.empFormModeEnum.AddOne ||
      this.formMode === this.empFormModeEnum.ReplicationOne
    ) {
      await this.createOneEmp();
    } else await this.changeOneEmp(emp.EmployeeId);
  }

  /**
   * Thực thi lựa chọn cất và thêm theo trường hợp tạo mới và sửa
   * @param {Object} emp Thông tin nhân viên đang tương tác
   * Created by: nkmdang (03/10/2023)
   */
  async clickSaveAndSaveNew(emp) {
    if (this.formMode === this.empFormModeEnum.AddOne) {
      await this.createOneEmpAndSaveNew();
    } else {
      this.changeOneEmp(emp.EmployeeId);
    }
    await this.openNewAddForm();
  }

  /**
   * Mở form mới trong lựa chọn cất và thêm
   * Created by: nkmdang (03/10/2023)
   */
  async openNewAddForm() {
    this.formMode = this.$baseEnum.EmployeeDetailFormMode.AddOne;
    // for (let key in this.empFormData) {
    //   this.empFormData[key] = undefined;
    // }
    this.$emitter.emit("clearComboboxValue");
    this.empFormData = {};
    await this.getNewEmployeeCode();
  }

  /**
   * Xử lý tác vụ trên EmployeeForm khi người dùng nhấn vào lựa chọn trên dialog
   * @param {Object} emp Thông tin nhân viên đang tương tác
   * Created by: nkmdang (03/10/2023)
   */
  async acceptEmpDetailForm(emp) {
    // Cất 1
    if (this.formMode === this.$employeeFormModeEnum.AddOne) {
      await this.createOneEmp();
    } else if (
      // Cất và thêm
      this.formMode === this.$employeeFormModeEnum.AddAndAddNew
    ) {
      await this.createOneEmpAndSaveNew();
      await this.openNewAddForm();
    } else if (
      // Sửa 1
      this.formMode === this.$employeeFormModeEnum.ChangeOne
    ) {
      await this.changeOneEmp(emp.EmployeeId);
    } else if (
      // Sửa và thêm 1
      this.formMode === this.$employeeFormModeEnum.ChangeOneAndAddNew
    ) {
      await this.changeOneEmp(emp.EmployeeId);
      await this.openNewAddForm();
    } else if (
      // Nhân bản 1
      this.formMode === this.$employeeFormModeEnum.ReplicationOne
    ) {
      await this.createOneEmp();
    } else if (
      // Nhân bản 1 và thêm mới
      this.formMode === this.$employeeFormModeEnum.ReplicationAndAddOne
    ) {
      await this.createOneEmp();
      await this.openNewAddForm();
    }
  }

  /**
   * Kiểm tra đóng form thì dữ liệu đã thay đổi chưa, nếu rồi thì hiện dialog hỏi xem có cất thông tin không
   * Created by: nkmdang (03/10/2023)
   */
  clickCloseEmployeeDetail() {
    let check = false;
    for (let key in this.empDetail) {
      if (this.empFormData[key] !== this.empDetail[key]) {
        check = true;
        break;
      }
    }
    if (check || this.formMode == this.empFormModeEnum.AddOne) {
      this.dialogContent =
        this.$resource[
          this.$languageCode
        ].DialogContent.ConfirmCloseEmployeeForm;
      this.isShowOptionDialog = true;
    } else {
      this.onCloseEmpDetail();
    }
  }

  async acceptSelectionEmployeeDetail() {
    // this.isShowAcceptDialog = false;
    this.isShowOptionDialog = false;
    // if (this.formMode == this.$baseEnum.EmployeeDetailFormMode.CancelClose) {
    //   this.onCloseEmpDetail();
    // } else if (
    //   this.formMode == this.$baseEnum.EmployeeDetailFormMode.NotClose
    // ) {
    //   return;
    // } else if (
    //   this.formMode == this.$baseEnum.EmployeeDetailFormMode.YesClose
    // ) {
    await this.clickSave(this.empFormData);
    // }
  }

  /**
   * Đóng các thẻ input, combobox, datepicker khi click ra ngoài
   */
  closeFieldsInForm() {
    this.$emitter.emit("closeComboboxDropList");
  }
}

export default new EmployeeDetailHandler();
