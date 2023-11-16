<template>
  <!-- <div class="main-container"  -->
  <!-- <TheSidebar></TheSidebar> -->
  <aside @click="hideEmpSelectFunc(empSelectFuncId)">
    <div class="emp-container">
      <!-- Tiêu đề bảng -->
      <div class="emp-head">
        <h1 class="emp-title">Nhân viên</h1>
        <button class="m-btn add-new-emp" @click="showEmpDetail">
          Thêm mới nhân viên
        </button>
      </div>

      <div class="emp-table-container">
        <!-- Search Employee -->
        <div class="search-emp-box">
          <div>
            <div class="batch-execute" v-if="isEmpBatchExe || isSelectAllEmp">
              <div class="selected-container">
                Đã chọn: <strong v-text="numEmpSelected"></strong>
              </div>
              <div
                class="unselected-container"
                @click="unSelectedAllEmpCurrentPage"
              >
                Bỏ chọn
              </div>

              <!-- <div
                class="selected-all-container"
                @click="selectAllEmp"
                v-if="!isSelectAllEmp"
              >
                Chọn tất cả các trang
              </div> -->
              <div
                class="action-container"
                @click="clickDeleteManyByListIdAsync()"
              >
                <div class="action-icon-box">
                  <div class="icons icon__trash"></div>
                </div>
                <div class="action-name">Xóa tất cả</div>
              </div>
              <div class="action-option-container" style="cursor: pointer">
                <div class="action-icon-box">
                  <img src="../../assets/img/threedot.png" alt="" />
                  <!-- <div class=""></div> -->
                </div>
                <!-- <div class="action-name"></div> -->
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="search-box">
              <input
                type="text"
                ref="inputSearchEmployee"
                id="search-emp-input"
                placeholder="Tìm kiếm theo mã, tên nhân viên"
                class="input-text"
                autofocus
                v-model="employeeProperty"
                @keydown.enter="searchEmployee(employeeProperty)"
                @focus="hideEmpSelectFunc(empSelectFuncId)"
              />
              <div class="emp-search__icon" id="search-emp-btn">
                <div class="icons search-icon"></div>
              </div>
            </div>
            <div class="emptable--icon flex-center">
              <div
                class="icons icon__exportexcel"
                @click="
                  exportExcelCurrentPage(page, pageSize, employeeProperty)
                "
              ></div>
              <!-- Liên kết ẩn để tải xuống tệp Excel -->
              <a ref="downloadLink"></a>
            </div>
            <div class="emptable--icon flex-center" @click="getAllEmployees">
              <div class="icons icon__reload"></div>
            </div>
          </div>
        </div>
        <!-- End search employee -->

        <!--BEGIN: Bảng thông tin nhân viên -->
        <div class="emp-table__box">
          <!-- <table
            class="emp-table"
            :class="{ emptable__disabled: isSelectAllEmp }"
          > -->
          <table class="emp-table">
            <thead>
              <th class="emp-column--sticky">
                <!-- <input type="checkbox" class="emp-checkbox" /> -->
                <!-- <MInputCheckbox @click="selectAllEmp" :checked="isEmpBatchExe"></MInputCheckbox> -->
                <div class="minput-checkbox-container">
                  <div class="checkbox-pseudobox">
                    <div class="icons" :class="checkAllEmpClass"></div>
                  </div>
                  <div class="checkbox-box">
                    <input
                      type="checkbox"
                      id="check"
                      ref="checkboxAllEmp"
                      @click.stop="selectAllEmp"
                    />
                  </div>
                </div>
              </th>
              <th class="emp-table__th--small">Mã nhân viên</th>
              <th class="emp-table__th--big">Tên nhân viên</th>
              <th class="emp-table__th--small">Giới tính</th>
              <th class="emp-table__th--small" style="text-align: center">
                Ngày sinh
              </th>
              <th class="emp-table__th--small">Chức danh</th>
              <th class="emp-table__th--small">Đơn vị</th>

              <th
                class="emp-table__th--small"
                title="Số chứng minh thư nhân dân"
              >
                Số CMND
              </th>

              <th class="emp-table__th--small" style="text-align: center">
                Ngày cấp
              </th>
              <th class="emp-table__th--big">Nơi cấp</th>
              <th class="emp-table__th--big">Địa chỉ</th>
              <th class="emp-table__th--medium">Điện thoại cố định</th>
              <th class="emp-table__th--medium">Điện thoại di động</th>
              <th class="emp-table__th--small">Email</th>
              <th class="emp-table__th--big">Tài khoản ngân hàng</th>
              <th class="emp-table__th--small">Tên ngân hàng</th>
              <th class="emp-table__th--small">Chi nhánh</th>
              <th class="emp-table__function">Chức năng</th>
            </thead>
            <tbody class="emp-tbody">
              <tr
                class="emp-tr"
                v-for="(emp, index) in empDataShow"
                :key="emp.EmployeeCode"
                @dblclick="showChangeEmpDetail(emp, index)"
              >
                <td class="emp-column--sticky" @dblclick.stop="">
                  <!-- <input type="checkbox" class="emp-checkbox" /> -->
                  <MInputCheckbox
                    :value="emp.EmployeeId"
                    v-model="employeeIdDeleteOne"
                    :checked="objectEmpSelectedCode[emp.EmployeeCode]"
                    @click.stop="selectOneEmp(index, emp)"
                  ></MInputCheckbox>
                </td>
                <td>
                  {{ emp.EmployeeCode }}
                </td>
                <td>
                  {{ emp.FullName }}
                </td>
                <td>
                  {{ this.$baseEnum.Gender[this.$languageCode][emp.Gender] }}
                </td>
                <td style="text-align: center">
                  {{ this.$helper.formatDate(emp.DateOfBirth) }}
                </td>
                <td>
                  {{ emp.PositionName }}
                </td>
                <td>
                  {{ emp.DepartmentName }}
                </td>
                <td>
                  {{ emp.PersonalIdentification }}
                </td>
                <td style="text-align: center">
                  {{ this.$helper.formatDate(emp.PICreatedDate) }}
                </td>
                <td>
                  {{ emp.PICreatedPlace }}
                </td>
                <td>
                  {{ emp.Address }}
                </td>
                <td>
                  {{ emp.LandLinePhone }}
                </td>
                <td>
                  {{ emp.Mobile }}
                </td>
                <td>
                  {{ emp.Email }}
                </td>
                <td>
                  {{ emp.BankAccount }}
                </td>
                <td>
                  {{ emp.BankBranchName }}
                </td>
                <td>
                  {{ emp.BankName }}
                </td>
                <td class="emp-table__function" @dblclick.stop="">
                  <div
                    class="emp-func-container flex-center"
                    @click="showChangeEmpDetail(emp, index)"
                  >
                    <div class="emp-change">Sửa</div>
                    <div
                      class="emp-select-func-box"
                      @click.stop="(event) => clickEmpSelectFunc(event, emp)"
                    >
                      <div
                        class="emp-select-func flex-center"
                        :class="{
                          'border-0075c0':
                            employeeIdDeleteOne === emp.EmployeeId,
                        }"
                      >
                        <div class="icons icon-angle-down"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="emp-drop-list"
          v-if="isShowEmpSelectFunc"
          :style="{
            top: `${this.empSelectFunctionPosition.top}px`,
            left: `${this.empSelectFunctionPosition.left}px`,
          }"
        >
          <div class="emp-drop-item">
            <a @click.stop="showReplicationEmpDetail(emp)">Nhân bản</a>
          </div>
          <div
            class="emp-drop-item"
            @click.stop="clickDeleteByIdAsync(employeeIdDeleteOne)"
          >
            <a>Xóa</a>
          </div>
          <div class="emp-drop-item">
            <a href="">Ngừng sử dụng</a>
          </div>
        </div>

        <div class="emp-footer">
          <div class="emp-total">
            Tổng số:
            <strong class="emp-nums" style="font-weight: bold">
              {{ countEmployees }}
            </strong>
            bản ghi
          </div>

          <div class="pagination-container">
            <div class="relative">
              <div class="num-perpage-container">
                <div class="num-perpage">{{ pageSize }} bản ghi một trang</div>
                <div
                  class="num-perpage-icon"
                  @click.stop="clickPaginationSelect"
                >
                  <div class="icons num-perpage-angledown"></div>
                </div>
              </div>
              <div class="pagination__droplist" v-if="isShowPagination">
                <div class="pagination__dropbox">
                  <div
                    class="pagination__dropitem"
                    @click="changePageSize(10)"
                    :class="{
                      'pagination__pagesize--selected': pageSize == 10,
                    }"
                  >
                    10 bản ghi một trang
                  </div>
                  <div
                    class="pagination__dropitem"
                    :class="{
                      'pagination__pagesize--selected': pageSize == 20,
                    }"
                    @click="changePageSize(20)"
                  >
                    20 bản ghi một trang
                  </div>

                  <div
                    class="pagination__dropitem"
                    :class="{
                      'pagination__pagesize--selected': pageSize == 20,
                    }"
                    @click="changePageSize(30)"
                  >
                    30 bản ghi một trang
                  </div>

                  <div
                    class="pagination__dropitem"
                    :class="{
                      'pagination__pagesize--selected': pageSize == 50,
                    }"
                    @click="changePageSize(50)"
                  >
                    50 bản ghi một trang
                  </div>

                  <div
                    class="pagination__dropitem"
                    :class="{
                      'pagination__pagesize--selected': pageSize == 100,
                    }"
                    @click="changePageSize(100)"
                  >
                    100 bản ghi một trang
                  </div>
                </div>
              </div>
            </div>

            <MPagination
              :countPages="countPages"
              :pageSelected="page"
              @onChangePage="changePage"
            ></MPagination>

            <!-- <div class="page__index">
              <div
                class="page__button--prev"
                :class="{ 'page__button--blur': pageSelected == 1 }"
                @click="prevPage"
              >
                <span>Trước</span>
              </div>
              <div
                class="flex"
                v-for="(page, index) in countPages"
                :key="index"
              >
                <div
                  v-if="page != '...'"
                  class="pagination-item"
                  :class="{ 'page--selected': pageSelected == page }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </div>
                <span v-else class="pagination-item">...</span>
              </div>
              <div
                class="page__button--next"
                :class="{
                  'page__button--blur':
                    pageSelected == countPages ||
                    pageSelected == countPages.length,
                }"
                @click="nextPage"
              >
                <span>Sau</span>
              </div>
            </div> -->
          </div>
        </div>
        <!-- END: Bảng thông tin nhân viên -->
      </div>
    </div>
    <EmployeeDetail
      v-if="isShowEmpDetail"
      :onCloseEmpDetail="hideEmpDetail"
      :type="empFormType"
      :empDetail="empDetail"
      :empFormModeEnum="empFormModeEnum"
      :newEmployeeCode="newEmployeeCode"
    ></EmployeeDetail>

    <MAcceptDialog
      v-if="isShowAcceptDialog"
      :dialogContent="dialogContent"
      @onClose="hideAcceptDialog"
      @onAccept="acceptSelection"
    ></MAcceptDialog>
  </aside>
</template>
<script>
import EmployeeListHandler from "./employeelisthandler";
import EmployeeDetail from "./EmployeeDetail.vue";
import EmployeeApi from "./employeeapi";
import { computed } from "vue";
// import axios from "axios";

export default {
  name: "EmployeeList",
  methods: {
    hideEmpDetail: EmployeeListHandler.hideEmpDetail,
    showEmpDetail: EmployeeListHandler.showEmpDetail,
    showChangeEmpDetail: EmployeeListHandler.showChangeEmpDetail,
    showReplicationEmpDetail: EmployeeListHandler.showReplicationEmpDetail,
    clickEmpSelectFunc: EmployeeListHandler.clickEmpSelectFunc,
    hideEmpSelectFunc: EmployeeListHandler.hideEmpSelectFunc,
    clickEmpPerPageList: EmployeeListHandler.clickEmpPerPageList,
    selectAllEmp: EmployeeListHandler.selectAllEmp,
    selectOneEmp: EmployeeListHandler.selectOneEmp,
    changeNumEmpsDataShowed: EmployeeListHandler.changeNumEmpsDataShowed,
    unSelectedAllEmpCurrentPage:
      EmployeeListHandler.unSelectedAllEmpCurrentPage,
    deleteAllEmpSelected: EmployeeListHandler.deleteAllEmpSelected,
    closeDialog: EmployeeListHandler.closeDialog,
    getAllEmployees: EmployeeApi.getAllEmployees,
    deleteOneEmployeeById: EmployeeApi.deleteOneEmployeeById,
    clickPaginationSelect: EmployeeListHandler.clickPaginationSelect,
    endCallApiToastMessage: EmployeeApi.endCallApiToastMessage,
    deleteManyByListIdAsync: EmployeeApi.deleteManyByListIdAsync,
    changePageSize: EmployeeApi.changePageSize,
    changePage: EmployeeApi.changePage,
    prevPage: EmployeeApi.prevPage,
    nextPage: EmployeeApi.nextPage,
    hideAcceptDialog: EmployeeListHandler.hideAcceptDialog,
    showAcceptDialog: EmployeeListHandler.showAcceptDialog,
    clickDeleteManyByListIdAsync:
      EmployeeListHandler.clickDeleteManyByListIdAsync,
    clickDeleteByIdAsync: EmployeeListHandler.clickDeleteByIdAsync,
    acceptSelection: EmployeeListHandler.acceptSelection,
    searchEmployee: EmployeeApi.searchEmployee,
    handleAfterGetEmployees: EmployeeApi.handleAfterGetEmployees,
    getDepartmentInformation: EmployeeApi.getDepartmentInformation,
    reloadViewPage: EmployeeListHandler.reloadViewPage,
    validateEmptyInput: EmployeeApi.validateEmptyInput,
    exportExcelCurrentPage: EmployeeApi.exportExcelCurrentPage,
    getNewEmployeeCode: EmployeeApi.getNewEmployeeCode,
  },
  data() {
    return {
      checkAllEmpClass: false,
      isShowNotificationDialog: false,
      isShowAcceptDialog: false,
      typeDelete: "",
      dialogContent: {
        Title: "",
        Message: "",
        Icon: "",
      },
      isLoading: false,
      isShowEmpDetail: false,
      isShowEmpPerPageList: false,
      isShowDialog: false,
      allEmpDatas: {},
      empDataShow: {},
      numEmpsDataShow: 10,
      departmentInformation: "",
      // Mảng lưu trữ trạng thái ẩn hiện của các dropdown list trong mục chức năng trong bảng
      isShowEmpSelectFuncArray: {},
      isShowEmpSelectFunc: false,
      empSelectFuncId: -1,
      empDetail: {},
      empFormType: "",
      empFormModeEnum: {
        AddOne: 0,
        AddAndAddNew: 1,
        ChangeOne: 10,
        ChangeOneAndAddNew: 11,
        ReplicationOne: 20,
        ReplicationAndAddOne: 21,
      },
      isEmpBatchExe: false, // Đánh dấu thực hiện hàng loạt
      objectEmpSelectedCode: {}, // Đánh dấu nhân viên nào được chọn
      isSelectAllEmp: false, // Đánh dấu tất cả nhân viên được chọn
      arrayEmployeeIdsDelete: {},
      employeeIdDeleteOne: null,
      numEmpSelected: 0,
      isSelectAllEmpCheckboxChecked: false,
      indexEmpToChange: -1, // index của nhân viên được sửa đổi để binding dữ liệu
      dialogContent: {
        Title: "",
        Message: "",
        Icon: "",
      },

      firstEmpIndex: 1,
      lastEmpIndex: 10,
      formStatus: 0,
      page: 1, // Trang được chọn
      pageSize: 50, // Số bản ghi trong trang

      isShowPagination: false,
      empSelectFunctionPosition: {
        // Vị trí menu thao tác với nhân viên hiện ra
        top: 0,
        left: 0,
      },
      countEmployees: 0, // Tổng số nhân viên trong kết quả
      countPages: 0, // Số trang hiện có
      pageSelected: 1, // Số thứ tự trang được chọn
      departmentData: [], // Thông tin đơn vị lấy từ CSDL
      employeeProperty: "", // Thông tin để tìm kiếm nhân viên
      newEmployeeCode: "", // Mã nhân viên mới
    };
  },

  components: {
    EmployeeDetail,
  },

  /**
   * Author: Minh Đăng 25/08/2023
   * Feat: Điều chỉnh thẻ input checkbox hợp lí khi click, disabled bảng khi chọn tất cả nhân viên
   */
  updated() {
    if (this.numEmpSelected >= 2) {
      this.$refs.checkboxAllEmp.checked = true;
    } else if (this.numEmpSelected <= 1) {
      this.$refs.checkboxAllEmp.checked = false;
    }
  },
  /**
   * Author: Minh Đăng 27/8/2023
   * Feat: Lấy dữ liệu nhân viên từ api
   */
  async created() {
    this.page = this.$route.query.page;
    this.pageSize = this.$route.query.pageSize;
    this.pageSelected = this.page;
    await this.getAllEmployees();
    await this.getDepartmentInformation();
    if (this.countPages.length) {
      this.isEmpSelected = new Array(this.countPages.length).fill(
        new Array(this.pageSize).fill(false)
      );
    } else {
      this.isEmpSelected = new Array(this.countPages);
      for (let i = 0; i < this.isEmpSelected.length; i++) {
        this.isEmpSelected[i];
      }
    }
    this.employeeIdDelete = new Array(this.empDataShow.length).fill(null);
    this.$emitter.on("onSaveOneEmployeeSuccess", this.getAllEmployees);
    this.$emitter.on("hideEmployeeDetail", this.hideEmpDetail);
    this.$emitter.on("showEmployeeDetail", this.showEmpDetail);
  },
  beforeUnmount() {
    this.$emitter.off("onSaveOneEmployeeSuccess");
    this.$emitter.off("hideEmployeeDetail");
    this.$emitter.off("showEmployeeDetail");
  },
  provide() {
    return {
      departmentData: computed(() => this.departmentData),
    };
  },
};
</script>
<style>
.icon__trash {
  background-position: -464px -313px;
  width: 15px;
  height: 15px;
}
</style>
