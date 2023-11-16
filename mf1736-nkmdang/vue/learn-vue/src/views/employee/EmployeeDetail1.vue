<template>
  <div class="emp-detail-container">
    <div class="emp-detail-box">
      <div class="emp-detail-head flex">
        <div class="emp-detail-title flex">
          <h1>{{ title || "Thêm mới nhân viên" }}</h1>
          <!-- <div class="emp-detail-checkbox">
            
            <MInputCheckbox></MInputCheckbox>
            <div class="customer-role">Là nhân viên</div>
          </div>
          <div class="emp-detail-checkbox">
            <MInputCheckbox></MInputCheckbox>
            
            <div class="customer-role">Là khách hàng</div>
          </div> -->
        </div>
        <div class="emp-detail-close-box flex-center">
          <div class="icons-box relative" style="margin-right: 10px">
            <div class="emp-detail-help icons"></div>

            <div class="tooltip-cont">
              <div class="tooltip-icon-box">
                <div class="tooltip-icon"></div>
              </div>
              <div class="tooltip-box" style="width: 70px">Giúp (F1)</div>
            </div>
          </div>
          <div class="icons-box relative" @click="onClose">
            <div class="emp-detail-close icons"></div>

            <div class="tooltip-cont">
              <div class="tooltip-icon-box">
                <div class="tooltip-icon"></div>
              </div>
              <div class="tooltip-box" style="width: 80px">Đóng (ESC)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="emp-detail-body">
        <div class="emp-detail-form">
          <div class="emp-detail-left">
            <div class="emp-left-head">
              <div
                class="emp-detail-half-box"
                style="margin-right: 10px; width: 30%"
              >
                <!-- <label for="" class="flex">
                  Mã
                  <div class="icons-align-center-box">
                    <div class="icon__required">*</div>
                  </div>
                </label> -->
                <MInputText
                  tabindex="1"
                  :initValue="empInput.EmployeeCode"
                  v-model="empInput.EmployeeCode"
                  :focus="true"
                  label="Mã"
                  required="true"
                  width="100%"
                >
                </MInputText>
                <!-- <div>{{ empInput.EmployeeCode }}</div> -->
                <!-- <input type="text" class="input-text emp-code" tabindex="1" v-model="empCodeOuput" /> -->
              </div>
              <div class="emp-detail-half-box" style="width: 70%">
                <MInputText
                  :initValue="empInput.FullName"
                  v-model="empInput.FullName"
                  tabindex="2"
                  @sendInputToParent="updateFullName"
                  required="true"
                  label="Tên"
                  width="100%"
                >
                </MInputText>
                <!-- <input type="text" class="input-text" style="width: 100%" :value="empInput.empName" tabindex="2" /> -->
              </div>
            </div>
            <div class="emp-detail-full-box">
              <label for="" style="margin-top: 15px"
                >Đơn vị
                <div class="icons-align-center-box">
                  <div class="icon__required">*</div>
                </div>
              </label>
              <!-- <div class="combobox-container">
                <div class="combobox-box">
                  <div class="combobox-input">
                    <MInputText :initValue="empInput.empUnitName" tabindex="3"></MInputText>
                    <input type="text" class="" :value="empInput.empUnitName" tabindex="3" />
                  </div>
                  <div class="combobox-sub-cont">
                    <div class="icons-align-center-box">
                      <div class="icons icon-angle-down"></div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- <MComboBox tabindex="3"></MComboBox> -->
              <MSCombobox
                url="https://cukcuk.manhnv.net/api/v1/Employees"
                propValue="EmployeeId"
                propText="DepartmentName"
                v-model="empInput.DepartmentName"
              ></MSCombobox>
            </div>

            <div class="emp-detail-full-box">
              <MInputText
                :initValue="empInput.PositionName"
                v-model="empInput.PositionName"
                label="Chức danh"
              >
              </MInputText>
              <!-- <div>{{ empInput.PositionName }}</div> -->
              <!-- <input type="text" class="input-text" tabindex="4" /> -->
            </div>
          </div>
          <div class="emp-detail-right">
            <div class="emp-right-head">
              <div class="emp-detail-half-box" style="width: 35%">
                <label for="" class="flex">Ngày sinh </label>

                <!-- <div class="combobox-container">
                  <div class="combobox-box">
                    <div class="combobox-input">
                      <input type="text" class="" :value="empInput.empBirthDay" tabindex="5" />
                    </div>
                    <div class="date-icon">
                      <div class="icons-align-center-box">
                        <div class="icons icon-calendar"></div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <MDatePicker
                  :initDate="this.$helper.formatDate(empInput.DateOfBirth)"
                  :tabindex="5"
                ></MDatePicker>
              </div>

              <div class="emp-detail-half-box" style="margin-left: 10px">
                <label for="" class="flex">Giới tính </label>

                <div
                  class="radio-container flex align-center"
                  style="margin-left: 0"
                >
                  <!-- <span class="pseudo-radio"></span>
                  <div class="radio-container flex align-center" style="margin-left: 0">
                    <div class="radio-input-box">
                      <input type="radio" class="radio-input" name="gender" value="Nam" tabindex="6" />
                    </div>
                    <div class="radio-box">
                      <div class="radio-body"></div>
                    </div>
                  </div> -->
                  <MInputRadio
                    :tabindex="6"
                    :name="'gender'"
                    valueInput="Nam"
                    :valueChecked="empInput.GenderName"
                  >
                  </MInputRadio>
                  <span class="gender">Nam</span>
                  <!-- <div class="radio-container flex align-center">
                    <div class="radio-input-box">
                      <input type="radio" class="radio-input" name="gender" value="Nữ" />
                    </div>
                    <div class="radio-box">
                      <div class="radio-body"></div>
                    </div>
                  </div> -->
                  <MInputRadio
                    :name="'gender'"
                    valueInput="Nữ"
                    :valueChecked="empInput.GenderName"
                  ></MInputRadio>
                  <span class="gender">Nữ</span>
                  <!-- <div class="radio-container flex align-center">
                    <div class="radio-input-box">
                      <input type="radio" class="radio-input" name="gender" value="Khác" />
                    </div>
                    <div class="radio-box">
                      <div class="radio-body"></div>
                    </div>
                  </div> -->
                  <MInputRadio
                    :name="'gender'"
                    valueInput="Khác"
                    :valueChecked="empInput.GenderName"
                  ></MInputRadio>
                  <span class="gender">Khác</span>
                </div>
              </div>
            </div>

            <div class="emp-left-head" style="margin-top: 15px">
              <div
                class="emp-detail-half-box relative"
                style="width: calc(100%)"
              >
                <MInputText
                  :initValue="empInput.PositionName"
                  :tabindex="7"
                  label="Số CMND"
                ></MInputText>
                <!-- <input type="text" class="input-text" style="width: 100%" :value="content.empCCCD" tabindex="7" /> -->
              </div>
              <div class="emp-detail-half-box" style="margin-left: 10px">
                <label for="" class="flex">Ngày cấp </label>
                <!-- <div class="combobox-container">
                  <div class="combobox-box">
                    <div class="combobox-input">
                      <input type="text" class="" value="12/08/2023" tabindex="8" />
                    </div>
                    <div class="date-icon">
                      <div class="icons-align-center-box">
                        <div class="icons icon-calendar"></div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <MDatePicker :tabindex="8"></MDatePicker>
              </div>
            </div>
            <div class="emp-detail-full-box">
              <MInputText :tabindex="9" label="Nơi cấp"></MInputText>
            </div>
          </div>
        </div>
      </div>

      <div class="emp-detail-footer">
        <div class="emp-detail-full-box" style="margin-top: 5px">
          <MInputText
            :tabindex="10"
            :initValue="empInput.Address"
            v-model="empInput.Address"
            label="Địa chỉ"
          >
          </MInputText>
          <!-- <input type="text" class="input-text" tabindex="10" /> -->
        </div>
        <div class="emp-detail-col3">
          <div class="emp-detail-td">
            <!-- <label for="" title="Điện thoại di động"></label> -->
            <MInputText
              :tabindex="11"
              :initValue="empInput.Mobile"
              v-model="empInput.Mobile"
              label="ĐT di động"
            >
            </MInputText>
            <!-- <input type="text" class="input-text" tabindex="11" /> -->
          </div>
          <div class="emp-detail-td">
            <label for="" title="Điện thoại cố định">ĐT cố định</label>
            <MInputText :tabindex="12"></MInputText>
            <!-- <input type="text" class="input-text" tabindex="12" /> -->
          </div>
          <div class="emp-detail-td">
            <label for="">Email</label>
            <MInputText
              :tabindex="13"
              :initValue="empInput.Email"
              v-model="empInput.Email"
            ></MInputText>
            <!-- <input type="text" class="input-text" tabindex="13" /> -->
          </div>
        </div>
        <div class="emp-detail-col3">
          <div class="emp-detail-td">
            <MInputText :tabindex="14" label="Điện thoại di động"></MInputText>
          </div>
          <div class="emp-detail-td">
            <MInputText :tabindex="15" label="Điện thoại cố định"></MInputText>
          </div>
          <div class="emp-detail-td">
            <MInputText :tabindex="16" label="Chi nhánh ngân hàng"></MInputText>
          </div>
        </div>
      </div>

      <div class="emp-detail-btn-box">
        <!-- <hr /> -->

        <div class="emp-detail-btn-cont">
          <MButton class="bg-white">Hủy</MButton>
          <!-- <button class="cancel emp-footer-btn" tabindex="19">Hủy</button> -->
          <div class="save-create">
            <div class="relative">
              <!-- <button class="save emp-footer-btn icons flex align-center" tabindex="17">
                Cất
              </button> -->
              <MButton class="bg-white mr-8" @click="saveNewEmployee"
                >Cất</MButton
              >
              <div class="tooltip-cont">
                <div class="tooltip-icon-box">
                  <div class="tooltip-icon"></div>
                </div>
                <div class="tooltip-box" style="width: 120px">
                  Cất (Ctrl + S)
                </div>
              </div>
            </div>
            <div class="relative">
              <!-- <button class="create emp-footer-btn icons flex align-center" tabindex="18">
                Cất và thêm
              </button> -->
              <MButton>Cất và thêm</MButton>
              <div class="tooltip-cont">
                <div class="tooltip-icon-box">
                  <div class="tooltip-icon"></div>
                </div>
                <div class="tooltip-box" style="width: 200px">
                  Cất và thêm (Ctrl + Shift + S)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MToastMessage
      v-if="isShowToastMessage"
      :onClose="hideToastMessage"
      :toastMesContent="toastMesContent"
    >
    </MToastMessage>
    <!-- <router-view></router-view> -->
    <MNotificationDialog
      v-if="isShowNotificationDialog"
      :dialogContent="dialogContent"
      :onClose="closeNotificationDialog"
    >
    </MNotificationDialog>
    <MIsLoading v-if="isLoading"></MIsLoading>
  </div>
</template>
<script>
// import { onMounted } from 'vue';
// import axios from 'axios';

export default {
  props: {
    clickClose: {},
    content: {
      default: {},
    },
    title: {},
  },
  methods: {
    /** Author: Minh Đăng
     * Feat: Mở form  thêm mới nhân viên 20/8/2023
     * */
    onClose() {
      // this.clickClose();
      this.$router.push("/employees");
    },
    /** Author: Minh Đăng
     * Feat: Cất form chi tiết nhân viên 20/8/2023
     * */
    async clickCat() {
      this.isShowToastMessage = true;
      this.toastMesContent =
        this.$dialogForm[this.$languageCode].ToastMesContent.Success;
      // console.log(this.$dialogForm[this.$languageCode].ToastMesContent.Success)
      const respone = await this.$axios.post(this.empInput);
      console.log(respone);
    },
    /** Author: Minh Đăng
     * Feat: Ẩn toast message 20/8/2023
     * */
    hideToastMessage() {
      this.$router.push("/employees");
    },
    /** Author: Minh Đăng
     * Feat: Binding dữ liệu mã nhân viên 20/8/2023
     * */
    updateEmployeeCode(newValue) {
      this.empInput.EmployeeCode = newValue;
    },
    /** Author: Minh Đăng
     * Feat: Binding dữ liệu tên nhân viên 20/8/2023
     * */
    updateFullName(newValue) {
      this.empInput.FullName = newValue;
    },
    /** Author: Minh Đăng
     * Feat: Binding dữ liệu vị trí làm việc nhân viên 20/8/2023
     * */
    updatePositionName(newValue) {
      this.empInput.PositionName = newValue;
    },
    /**
     * Author: Minh Đăng 31/08/2023
     * Feat: Đóng toast message
     */
    closeToastMessage() {
      window.location.reload();
      this.$router.push("/employees");
      // this.isShowToastMessage = false;
    },
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
      }
    },
    async saveNewEmployee() {
      try {
        // Hiển thị loading
        this.isLoading = true;

        // Kiểm tra đầu vào không rỗng
        if (
          this.empInput.EmployeeCode == "" ||
          this.empInput.FullName == "" ||
          this.empInput.DepartmentName == ""
        ) {
          this.isShowNotificationDialog = true;
          // console.log(this.$resource[this.$languageCode].DialogContent.CustomerForm.ErrorInput.MissingRequiredField)
          this.dialogContent =
            this.$resource[
              this.$languageCode
            ].DialogContent.CustomerForm.ErrorInput.MissingRequiredField;
          this.isLoading = false;
          return;
        }

        // Gửi request lên server
        const respone = await this.$axios.post(
          "https://cukcuk.manhnv.net/api/v1/Employees",
          this.empInput
        );
        console.log(respone);

        // Thực hiện thành công và hiển thị toast message
        this.isShowToastMessage = true;
        this.toastMesContent =
          this.$resource[this.$languageCode].ToastMesContent.Success;
        setTimeout(this.closeToastMessage, 5000);
        this.isLoading = false;

        // this.$router.push("/customerlist")
      } catch (error) {
        this.axiosEmployeeErrorHandler(error);
      }
      console.log(this.empInput);
    },
    /**
     * Author: Minh Đăng 24/08/2023
     * Feat: Đóng thông báo dialog
     */
    closeNotificationDialog() {
      // this.$router.push("/employees")
      this.isShowNotificationDialog = false;
      // window.location.reload()
    },
  },
  data() {
    return {
      // isShowEmpDetail: false,
      isLoading: false,
      isShowToastMessage: false,
      isShowNotificationDialog: false,
      empCodeOuput: this.content.empCode,
      empInput: {
        EmployeeCode: "",
        FullName: "",
        PositionName: "",
        GenderName: "",
      },
      isShowDialog: false,
      toastMesContent: {
        Status: "",
        Desc: "",
        TextClass: "",
        OptionAction: "",
        Icon: "",
      },
    };
  },
};
</script>
<style></style>
