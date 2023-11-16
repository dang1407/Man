class EmployeeListHandler {
  constructor() {}
  /**
   * Author: Minh Đăng
   * Function: Đóng form  thêm mới nhân viên 20/8/2023
   * */
  hideEmpDetail() {
    this.isShowEmpDetail = false;
    this.isEmpSelectFuncId = false;
    // this.$router.push("/employees");
  }
  /**
   * Author: Minh Đăng
   * Function: Mở form  thêm mới nhân viên 20/8/2023
   * */
  showEmpDetail() {
    this.isShowEmpDetail = true;
    this.empDetail = {};
    this.empFormType = this.empFormModeEnum.AddOne;
  }

  /**
   * Mở form ở chế độ nhân bản
   * Created by: nkmdang(20/08/2023)
   * @param {Object} emp Object chứa thông tin nhân viên
   */
  showChangeEmpDetail(emp) {
    this.empFormType = this.empFormModeEnum.ChangeOne;
    this.empDetail = emp;
    this.isShowEmpDetail = true;
    this.empDetailTitle = "Thông tin nhân viên";
  }

  /**
   * Mở form ở chế độ nhân bản
   * Created by: nkmdang(02/10/2023)
   * @param {Object} emp Object chứa thông tin nhân viên
   */
  async showReplicationEmpDetail() {
    const response = await this.getNewEmployeeCode();
    this.newEmployeeCode = response.data;
    this.empFormType = this.empFormModeEnum.ReplicationOne;
    this.isShowEmpDetail = true;
    this.empDetailTitle = "Thông tin nhân viên";
  }

  /**
   * Mở phần chọn chức năng với nhân viên
   * @param {*} index
   * @param {Object} event Lấy ra thông tin tọa độ để hiển thị hộp chọn chức năng
   * @param {Object} emp Thông tin nhân viên đang thao tác
   *
   * Created by: nkmdang 20/08/2023
   */
  clickEmpSelectFunc(event, emp) {
    // e.stopPropagation();
    // console.log(index);
    // const prevValue = this.isShowEmpSelectFuncArray[index];
    // this.isShowEmpSelectFuncArray = new Array(
    //   this.isShowEmpSelectFuncArray.length
    // ).fill(false);
    // this.isShowEmpSelectFuncArray[index] = !prevValue;
    // this.empSelectFuncId = index;
    this.isShowEmpSelectFunc = !this.isShowEmpSelectFunc;
    console.log(event.target.getBoundingClientRect());
    this.empSelectFunctionPosition.top =
      event.target.getBoundingClientRect().y + 15;
    this.empSelectFunctionPosition.left =
      event.target.getBoundingClientRect().x - 142;
    this.employeeIdDeleteOne = emp.EmployeeId;
    this.empDetail = emp;
  }

  /**
   * Author: Minh Đăng
   * Function: Ẩn phần chọn chức năng với nhân viên  20/8/2023
   * */
  hideEmpSelectFunc(empSelectFuncId) {
    // console.log(empSelectFuncId);
    this.isShowEmpSelectFuncArray[empSelectFuncId] = false;
    empSelectFuncId = -1;
    this.isShowPagination = false;
    this.isShowEmpSelectFunc = false;
  }
  /**
   * Author: Minh Đăng
   * Function: Mở phần chọn số nhân viên trong bảng 20/8/2023
   * */
  clickEmpPerPageList() {
    this.isShowEmpPerPageList = !this.isShowEmpPerPageList;
  }
  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Xử lý error khi request axios bị lỗi (400, 500)
   * @param {*} error
   */
  axiosEmployeeErrorHandler(error) {
    this.isLoading = false;
    console.log(error);
    switch (error.response.status) {
      case 500:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[
            this.$languageCode
          ].DialogContent.EmployeeForm.ErrorInput.InvalidField;
        this.dialogContent.Message = error.response.data.userMsg;
        // console.log(this.dialogContent)
        break;
      case 400:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[
            this.$languageCode
          ].DialogContent.EmployeeForm.ErrorInput.InvalidField;
        this.dialogContent.Message = error.response.data.userMsg;
        // console.log(this.dialogContent)
        break;
      case 404:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[
            this.$languageCode
          ].DialogContent.EmployeeForm.NotFound;
        break;
      case 401:
        this.isShowNotificationDialog = true;
        this.dialogContent =
          this.$resource[this.$languageCode].DialogContent.InvalidSignup;
        break;
    }
  }

  /**
   * Author: Minh Đăng
   * Function: Chọn và bỏ chọn tất cả nhân viên trong bảng 24/8/2023
   * */
  selectAllEmp() {
    this.isSelectAllEmp = !this.isSelectAllEmp;
    if (this.isSelectAllEmp) {
      let newEmpSelectedInCurrentPage = 0;

      this.empDataShow.map((emp) => {
        this.objectEmpSelectedCode[emp.EmployeeCode] = true;
        if (!this.arrayEmployeeIdsDelete[emp.EmployeeId]) {
          newEmpSelectedInCurrentPage += 1;
        }
        this.arrayEmployeeIdsDelete[emp.EmployeeId] = true;
      });
      this.numEmpSelected += newEmpSelectedInCurrentPage;
      this.checkAllEmpClass = "tickv-circle";
    } else {
      let numEmpUnSelectedInCurrentPage = 0;

      this.empDataShow.map((emp) => {
        this.objectEmpSelectedCode[emp.EmployeeCode] = undefined;
        if (this.arrayEmployeeIdsDelete[emp.EmployeeId]) {
          numEmpUnSelectedInCurrentPage += 1;
        }
        this.arrayEmployeeIdsDelete[emp.EmployeeId] = false;
      });
      this.numEmpSelected -= numEmpUnSelectedInCurrentPage;
      this.checkAllEmpClass = "";
    }
  }

  /**
   * Author: Minh Đăng
   * Function: Chọn hoặc bỏ chọn 1 nhân viên 24/8/2023
   * @param(id)
   * */
  selectOneEmp(index, emp) {
    // console.log(index);
    this.objectEmpSelectedCode[emp.EmployeeCode] =
      !this.objectEmpSelectedCode[emp.EmployeeCode];
    // Nếu nhân viên được chọn
    if (this.objectEmpSelectedCode[emp.EmployeeCode]) {
      this.arrayEmployeeIdsDelete[emp.EmployeeId] = true;
      this.numEmpSelected += 1;
    } else {
      // Nếu nhân viên bị bỏ chọn
      this.arrayEmployeeIdsDelete[emp.EmployeeId] = undefined;
      this.numEmpSelected -= 1;
    }

    // Nếu tất cả nhân viên được chọn
    if (this.numEmpSelected === this.empDataShow.length) {
      this.isSelectAllEmp = true;
      this.checkAllEmpClass = "tickv-circle";
    }
    if (this.numEmpSelected < this.countEmployees) {
      this.isSelectAllEmp = false;
    }
    if (this.numEmpSelected >= 2 && !this.isSelectAllEmp) {
      this.isEmpBatchExe = true;
      this.checkAllEmpClass = "ti-minus";
      // this.isSelectAllEmpCheckboxChecked = true;
    } else if (this.numEmpSelected <= 1) {
      this.isEmpBatchExe = false;
      this.isSelectAllEmp = false;
      this.checkAllEmpClass = "";
    }
  }

  /**
   * Author: Minh Đăng 24/8/2023
   * Feat: Thay đổi số nhân viên trong bảng
   * @param {num}
   */
  changeNumEmpsDataShowed(num) {
    this.numEmpsDataShow = num;
    this.empData = this.displayEmpByNum();
    // console.log(num);
  }

  /**
   * Author: Minh Đăng 24/08/2023
   * Feat: Bỏ chọn tất cả các nhân viên đang được chọn
   */
  unSelectedAllEmpCurrentPage() {
    this.isSelectAllEmp = false;

    let numEmpUncheck = 0;
    this.empDataShow.map((emp) => {
      this.objectEmpSelectedCode[emp.EmployeeCode] = undefined;
      if (this.arrayEmployeeIdsDelete[emp.EmployeeId]) {
        numEmpUncheck++;
      }
      this.arrayEmployeeIdsDelete[emp.EmployeeId] = undefined;
    });
    this.numEmpSelected -= numEmpUncheck;
    if (this.numEmpSelected <= 1) {
      this.isEmpBatchExe = false;
    }
  }

  /**
   * Author: Minh Đăng 24/08/2023
   * Feat: Thông báo xác nhận xóa tất cả nhân viên được chọn
   */
  deleteAllEmpSelected() {
    this.isShowAcceptDialog = true;
    this.dialogContent.Title = "Xóa tất cả nhân viên đã chọn?";
    this.dialogContent.Message = "Thao tác này không thể khôi phục được.";
    this.dialogContent.Icon = "icon__bigwarning";
    this.dialogContent.Cancel = "Hủy";
    this.dialogContent.Accept = "Đồng ý";
  }

  /**
   * Author: Minh Đăng 24/08/2023
   * Feat: Đóng thông báo dialog
   */
  closeDialog() {
    this.isShowDialog = false;
  }

  /**
   * Author: Minh Đăng 21/09/2023
   * Hàm đóng, mở bảng chọn số bản ghi trên trang
   */
  clickPaginationSelect() {
    this.isShowPagination = !this.isShowPagination;
  }

  /**
   * Hiển thị ra thông báo accept có thực hiện tiếp hành động hay không
   * Created by: nkmdang (03/10/2023)
   */
  showAcceptDialog() {
    this.isShowAcceptDialog = true;
  }

  /**
   * Ẩn thông báo accept khi người dùng không thực hiện hành động
   * Created by: nkmdang (03/10/2023)
   */
  hideAcceptDialog() {
    this.isShowAcceptDialog = false;
  }

  /**
   * Xác nhận người dùng chắc chắn xóa nhiều nhân viên
   * Created by: nkmdang (03/10/2023)
   */
  clickDeleteManyByListIdAsync() {
    this.dialogContent =
      this.$resource[
        this.$languageCode
      ].DialogContent.ConfirmDeleteManyEmployees;
    // const employeeDeletes = this.employeeIdDelete.filter((emp) => emp != null);
    // const numEmployeeDelete = employeeDeletes.length;
    this.dialogContent.Message = `Bạn có chắc chắn muốn xóa ${this.numEmpSelected} nhân viên đã được chọn?`;
    // console.log(this.$resource[this.$languageCode].DialogContent);
    this.isShowAcceptDialog = true;
    // this.acceptSelection = this.deleteManyByListIdAsync(employeeIdDelete);
    this.typeDelete = this.$baseEnum.DeleteType.DeleteMany;
  }

  /**
   * Xác nhận người dùng xóa 1 nhân viên
   * Created by: nkmdang (03/10/2023)
   */
  clickDeleteByIdAsync() {
    this.dialogContent =
      this.$resource[this.$languageCode].DialogContent.ConfirmDeleteOneEmployee;
    // console.log(this.$resource[this.$languageCode].DialogContent);
    const id = this.employeeIdDeleteOne;
    const employeeDelete = this.empDataShow.filter(
      (emp) => emp.EmployeeId == id
    );
    console.log(employeeDelete);
    const employeeCode = employeeDelete[0].EmployeeCode;
    this.dialogContent.Message = `Bạn có thực sự muốn xóa Nhân viên <${employeeCode}> không?`;
    this.isShowAcceptDialog = true;
    // this.acceptSelection = this.deleteOneEmployeeById(employeeIdDeleteOne);
    this.typeDelete = this.$baseEnum.DeleteType.DeleteOne;
  }

  /**
   * Kiểm tra lựa chọn được emit từ component dialog để quyết định xóa 1 hay nhiều
   * Created by: nkmdang (03/10/2023)
   */
  acceptSelection() {
    this.isShowAcceptDialog = false;
    // Xử lý xóa ở EmployeeList
    if (this.typeDelete === this.$baseEnum.DeleteType.DeleteMany) {
      const ids = new Array();
      for (let key in this.arrayEmployeeIdsDelete) {
        if (this.arrayEmployeeIdsDelete[key] === true) {
          ids.push(key);
        }
      }
      // console.log(ids);
      this.deleteManyByListIdAsync(ids);
    } else if (this.typeDelete === this.$baseEnum.DeleteType.DeleteOne) {
      this.deleteOneEmployeeById(this.employeeIdDeleteOne);
    }
  }

  /**
   * Chuyển trang bỏ các nhân viên được chọn, chế độ chọn nhiều, focus vào thẻ input
   * Created by: nkmdang (3/10/2023)
   */
  reloadViewPage() {
    this.$refs.inputSearchEmployee.focus();
    this.isSelectAllEmp = false;
    this.isEmpSelected = new Array(this.empDataShow.length).fill(false);
    this.isEmpBatchExe = false;
    this.numEmpSelected = 0;
  }
}
export default new EmployeeListHandler();
