<template>
  <div
    @keydown="(eventKeyBoard) => handleEmployeeFormKeyDown(eventKeyBoard)"
    @click="closeFieldsInForm"
  >
    <m-form :title="empFormTitle" :closeForm="clickCloseEmployeeDetail">
      <template v-slot:MFormBody>
        <div class="flex" style="margin-top: 20px">
          <div class="mform--half" style="margin-right: 10px">
            <div class="mform--half__item flex">
              <div style="width: 40%; margin-right: 10px">
                <m-input-text
                  tabindex="1"
                  label="Mã"
                  required="true"
                  :focus="true"
                  v-model="empFormData.EmployeeCode"
                  :missingInput="missingInput.EmployeeCode"
                  :initValue="empFormData.EmployeeCode"
                  ref="employeeCodeInput"
                ></m-input-text>
              </div>
              <div style="width: 60%">
                <m-input-text
                  label="Tên"
                  required="true"
                  tabindex="2"
                  v-model="empFormData.FullName"
                  :missingInput="missingInput.FullName"
                ></m-input-text>
              </div>
            </div>
            <div class="mform--half__item">
              <!-- <div style="margin-bottom: 5px; font-weight: bold" class="flex">
                Đơn vị
                <div class="icon__required">*</div>
              </div> -->

              <MComboBox
                v-model="empFormData.DepartmentName"
                label="Đơn vị"
                :required="true"
                tabindex="3"
                :initValue="empFormData.DepartmentName"
                :missingInput="missingInput.DepartmentName"
                :listOptions="departmentNames"
                optionName="Đơn vị"
              ></MComboBox>
            </div>
            <div class="mform--half__item">
              <m-input-text
                label="Chức danh"
                tabindex="4"
                v-model="empFormData.PositionName"
              ></m-input-text>
            </div>
          </div>
          <div class="mform--half" style="margin-left: 10px">
            <div class="mform--half__item flex">
              <m-date-picker
                label="Ngày sinh"
                tabindex="5"
                :initDate="empFormData.DateOfBirth"
                v-model="empFormData.DateOfBirth"
              ></m-date-picker>
              <div style="margin-left: 10px">
                <div style="font-weight: bold; margin-bottom: 8px">
                  Giới tính
                </div>

                <div
                  class="radio-container flex align-center"
                  style="margin-left: 0"
                >
                  <MInputRadio
                    :tabindex="6"
                    name="gender"
                    :value="1"
                    :valueChecked="empFormData.Gender"
                    v-model="empFormData.Gender"
                  >
                  </MInputRadio>
                  <span class="gender">Nam</span>
                  <MInputRadio
                    :tabindex="7"
                    name="gender"
                    :value="0"
                    :valueChecked="empFormData.Gender"
                    v-model="empFormData.Gender"
                  ></MInputRadio>
                  <span class="gender">Nữ</span>

                  <MInputRadio
                    :tabindex="8"
                    name="gender"
                    :value="2"
                    :valueChecked="empFormData.Gender"
                    v-model="empFormData.Gender"
                  ></MInputRadio>
                  <span class="gender">Khác</span>
                </div>
              </div>
            </div>
            <div class="mform--half__item flex">
              <div style="width: calc(100% - 150px)">
                <m-input-text
                  tabindex="9"
                  label="Số CMND"
                  tooltip="Số chứng minh thư nhân dân"
                  v-model="empFormData.PersonalIdentification"
                ></m-input-text>
              </div>
              <div style="margin-left: 10px">
                <m-date-picker
                  label="Ngày cấp"
                  tabindex="10"
                  :initDate="empFormData.PICreatedDate"
                  v-model="empFormData.PICreatedDate"
                ></m-date-picker>
              </div>
            </div>
            <div class="mform--half__item">
              <div>
                <m-input-text
                  tabindex="11"
                  label="Nơi cấp"
                  v-model="empFormData.PICreatedPlace"
                ></m-input-text>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 45px">
          <!-- ĐT cố định, ĐT di động, Email -->
          <div style="margin-top: 25px">
            <m-input-text
              tabindex="11"
              label="Địa chỉ"
              v-model="empFormData.Address"
            ></m-input-text>
          </div>

          <div style="margin-top: 25px">
            <div class="flex">
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="12"
                  label="ĐT cố định"
                  tooltip="Điện thoại cố định"
                  v-model="empFormData.LandLinePhone"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="13"
                  label="ĐT di động"
                  tooltip="Điện thoại di động"
                  v-model="empFormData.Mobile"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="14"
                  label="Email"
                  v-model="empFormData.Email"
                ></m-input-text>
              </div>
            </div>
          </div>

          <!-- TK ngân hàng, tên ngân hàng, chi nhánh -->
          <div style="margin-top: 25px">
            <div class="flex">
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="15"
                  label="Tài khoản ngân hàng"
                  v-model="empFormData.BankAccount"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="16"
                  label="Tên ngân hàng"
                  v-model="empFormData.BankName"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text
                  tabindex="17"
                  label="Chi nhánh"
                  v-model="empFormData.BankBranchName"
                ></m-input-text>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:MFormFooter>
        <div class="mform--footer">
          <div>
            <MButton class="bg-white" tabindex="18">Hủy</MButton>
          </div>
          <div class="flex">
            <div style="margin-right: 10px" class="relative">
              <m-button
                tabindex="19"
                class="bg-white"
                @click="() => clickSave(empFormData)"
                >Cất</m-button
              >
            </div>
            <div>
              <m-button tabindex="20" @click="clickSaveAndSaveNew(empFormData)"
                >Cất và thêm</m-button
              >
            </div>
          </div>
        </div>
      </template>
    </m-form>
    <!-- <MAcceptDialog
      v-if="isShowAcceptDialog"
      :dialogContent="dialogContent"
      @onClose="hideAcceptDialog"
      @onAccept="acceptSelectionEmployeeDetail"
    ></MAcceptDialog> -->
    <MOptionDialog
      v-if="isShowOptionDialog"
      :dialogContent="dialogContent"
      @onNotOptionDialog="onCloseEmpDetail"
      @onCancelOptionDialog="() => (this.isShowOptionDialog = false)"
      @onAcceptOptionDialog="acceptSelectionEmployeeDetail"
    ></MOptionDialog>
  </div>
</template>
<script>
// import axios from '@/js/axios';
import EmployeeApi from "./employeeapi";
import EmployeeDetailHandler from "./employeedetailhandler";
import Employeelisthandler from "./employeelisthandler";
import EmployeeResource from "./employeeresource";
export default {
  props: [
    "onCloseEmpDetail",
    "type",
    "empDetail",
    "employeeBaseUrlApi",
    "empFormModeEnum",
    "newEmployeeCode",
  ],
  inject: ["departmentData"],
  data() {
    return {
      empFormData: {
        EmployeeCode: null,
        FullName: null,
        Gender: null,
        GenderName: null,
        DateOfBirth: null,
        PositionName: null,
        PhoneNumber: null,
        Email: null,
        Address: null,
        DepartmentName: null,
        PersonalIdentification: null,
        PIDateCreated: null,
        PIPlaceCreated: null,
        LandLinePhone: null,
        Mobile: null,
        BankName: null,
        BankBranchName: null,
        BankAccountNumber: null,
        // departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
      missingInput: {
        EmployeeCode: false,
        FullName: false,
        DepartmentName: false,
      },

      errorFormDataField: {
        EmployeeCode: false,
        FullName: false,
        Gender: false,
        GenderName: false,
        DateOfBirth: false,
        PositionName: false,
        PhoneNumber: false,
        Email: false,
        Address: false,
        DepartmentName: false,
        PersonalIdentification: false,
        PIDateCreated: false,
        PIPlaceCreated: false,
        LandLinePhone: false,
        Mobile: false,
        BankName: false,
        BankBranchName: false,
        BankAccountNumber: false,
        // departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },

      departmentInformation: "",
      empFormTitle: "Thêm mới nhân viên",
      departmentNames: {
        type: Array,
      },
      formMode: this.type, // Chế độ form (thêm mới, sửa thông tin)
      isShowAcceptDialog: false,
      isShowOptionDialog: false,
      dialogContent: {},

      employeeResourceLanguage: EmployeeResource[this.$languageCode],
      globalResourceLanguage: this.$resource[this.$languageCode],
    };
  },
  methods: {
    createOneEmp: EmployeeApi.createOneEmp,
    clickSave: EmployeeDetailHandler.clickSave,
    createOneEmpAndSaveNew: EmployeeApi.createOneEmpAndSaveNew,
    changeOneEmp: EmployeeApi.changeOneEmp,
    handleEmployeeFormKeyDown: EmployeeDetailHandler.handleEmployeeFormKeyDown,
    clickSaveAndSaveNew: EmployeeDetailHandler.clickSaveAndSaveNew,
    openNewAddForm: EmployeeDetailHandler.openNewAddForm,
    getNewEmployeeCode: EmployeeApi.getNewEmployeeCode,
    hideAcceptDialog: Employeelisthandler.hideAcceptDialog,
    acceptSelectionEmployeeDetail:
      EmployeeDetailHandler.acceptSelectionEmployeeDetail,
    clickCloseEmployeeDetail: EmployeeDetailHandler.clickCloseEmployeeDetail,

    // Begin Validate EmployeeFormData
    validateEmptyInput: EmployeeApi.validateEmptyInput,
    validateEmployeeBussiness: EmployeeApi.validateEmployeeBussiness,
    validateMaxlength: EmployeeApi.validateMaxlength,
    openPopupNotification: EmployeeApi.openPopupNotification,
    cleanEmptyString: EmployeeApi.cleanEmptyString,
    // End Validate EmployeeFormData

    // Đóng các thành phần khi không sử dụng (Danh sách thả dưới combobox,...)
    closeFieldsInForm: EmployeeDetailHandler.closeFieldsInForm,
  },
  watch: {},
  async created() {
    this.departmentNames = this.departmentData.map(
      (department) => department.DepartmentName
    );
    if (this.formMode == this.empFormModeEnum.AddOne) {
      this.empFormTitle = "Thêm mới nhân viên";
      const response = await this.getNewEmployeeCode();
      this.empFormData.EmployeeCode = response.data;
      // try {
      //   this.$emitter.emit("onShowLoading");
      //   const response = await this.$axios.get("Employees/NewEmployeeCode");
      //   this.$emitter.emit("onHideLoading");
      //   // if (response.status == 200) {
      //   this.empFormData.EmployeeCode = response.data;
      //   this.empFormData.DateOfBirth = this.empFormData.DateOfBirth.substring(
      //     0,
      //     10
      //   );
      //   // console.log(this.empFormData);
      //   // }
      // } catch (error) {
      //   this.$emitter.emit("onHideLoading");
      //   this.$emitter.emit(
      //     "onShowToastMessage",
      //     this.$resource[this.$languageCode].ToastMessageContent.EmployeeForm
      //       .CannotGetNewEmployeeCode
      //   );
      //   console.log(error);
      // }
    } else if (this.formMode == this.empFormModeEnum.ReplicationOne) {
      // await this.getNewEmployeeCode();
      this.empFormData = this.empDetail;
      this.empFormData.EmployeeCode = this.newEmployeeCode;
    } else if (this.formMode == this.empFormModeEnum.ChangeOne) {
      this.empFormTitle = "Thông tin nhân viên";
      if (this.empDetail) {
        // console.log(this.empDetail);
        for (let key in this.empDetail) {
          this.empFormData[key] = this.empDetail[key];
        }
        // this.empFormData.DateOfBirth = this.empFormData.DateOfBirth.substring(
        //   0,
        //   10
        // );
        // this.empFormData.PICreatedDate =
        //   this.empFormData.PICreatedDate.substring(0, 10);
        // console.log(this.empFormData);
      }
    }
  },
  mounted() {
    // console.log(this.$refs.employeeCodeInput);
    // this.$refs.employeeCodeInput.focusInput();
  },
};
</script>
<style scoped>
.mform--half {
  width: 50%;
}
.mform--half__item + .mform--half__item {
  margin-top: 25px;
}
.mfrom--col3__item {
  margin-right: 10px;
}
.datepicker--label {
  font-weight: bold;
  margin-bottom: 8px;
}

.mform--footer {
  margin-top: 45px;
  display: flex;
  justify-content: space-between;
}
</style>
