<template>
  <aside>
    <div class="emp-container">
      <!-- Tiêu đề bảng -->
      <div class="emp-head">
        <h1 class="emp-title">Khách hàng</h1>
        <button class="m-btn add-new-emp" @click="addNewCustomer">Thêm mới khách hàng</button>
      </div>

      <div class="emp-table-container">
        <!-- Search Employee -->
        <div class="search-emp-box">
          <div>
            <div class="batch-execute" v-if="isCustomerBatchExe || isSelectAllCustomer">
              <div class="selected-container">
                Đã chọn: <strong v-text="numCustomerSelected"></strong>
              </div>
              <div class="unselected-container" @click="unselectedAllCustomer">
                Bỏ chọn
              </div>

              <div class="selected-all-container" @click="selectAllCustomer" v-if="!isSelectAllCustomer">
                Chọn tất cả các trang
              </div>
              <div class="action-container">
                <div class="action-icon-box">
                  <div class="ti-trash" style="color: #e61d1d;"></div>
                </div>
                <div class="action-name">Xóa tất cả</div>
              </div>
              <div class="action-option-container" style="cursor: pointer;">
                <div class="action-icon-box">
                  <img src="../../assets/img/threedot.png" alt="">
                  <!-- <div class=""></div> -->
                </div>
                <!-- <div class="action-name"></div> -->
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="search-box">
              <input type="text" id="search-emp-input" placeholder="Tìm kiếm theo mã, tên nhân viên" class="input-text" />
              <div class="icon-box" id="search-emp-btn">
                <div class="icons search-icon"></div>
              </div>
            </div>
            <div class="emptable--icon flex-center">
              <div class="icons icon__exportexcel"></div>
            </div>
            <div class="emptable--icon flex-center">
              <div class="icons icon__reload"></div>
            </div>

          </div>
        </div>
        <!-- End search employee -->

        <!--BEGIN: Bảng thông tin nhân viên -->
        <table class="emp-table" :class="{ 'emptable__disabled': isSelectAllCustomer }">
          <thead>
            <th>
              <!-- <input type="checkbox" class="emp-checkbox" /> -->
              <!-- <MInputCheckbox @click="selectAllEmp" :checked="isEmpBatchExe"></MInputCheckbox> -->
              <div class="minput-checkbox-container">
                <div class="checkbox-pseudobox">
                  <div class="icons" :class="checkAllCustomerClass">
                  </div>
                </div>
                <div class="checkbox-box">
                  <input type="checkbox" id="check" ref="checkboxAllCustomer" @click="selectAllCustomer">
                </div>
              </div>
            </th>
            <!-- <th>Mã nhân viên</th> -->
            <th style="min-width: 150px;">Mã khách hàng</th>
            <th style="min-width: 200px;">Họ và tên</th>
            <th style="min-width: 100px;">Giới tính</th>
            <th>Ngày sinh </th>
            <th style="min-width: 170px;">Số điện thoại</th>
            <th style="min-width: 200px;">Công ty</th>
            <th style="min-width: 100px;">Dư nợ</th>
            <!-- <th>Chi nhánh TK ngân hàng</th> -->
            <th>Chức năng</th>
          </thead>
          <tbody class="emp-tbody">
            <tr class="emp-tr" v-for="(customer, index) in customerDataShow" :key="customer.empCode"
              @dblclick="() => showChangeCustomerDetail(customer, index)">
              <td>
                <!-- <input type="checkbox" class="emp-checkbox" /> -->
                <MInputCheckbox :checked="isCustomerSelected[index]" @click="selectOneCustomer(index)"></MInputCheckbox>
              </td>
              <td>{{ customer.CustomerCode }}</td>
              <td>{{ customer.FullName }}</td>
              <td>{{ this.$baseEnum.Gender[this.$languageCode][customer.Gender] }}</td>
              <td>{{ this.$helper.formatDate(customer.DateOfBirth) }}</td>
              <td>{{ customer.PhoneNumber }}</td>
              <!-- <td>{{ this.$helper.formatDate(customer.ModifiedDate) }}</td> -->
              <td>{{ customer.CompanyName }}</td>
              <td>{{ customer.DebitAmount }}</td>
              <td>
                <div class="emp-func-container flex-center">
                  <div class="emp-change">Sửa</div>
                  <div class="emp-select-func-box" @click.stop="clickCustomerSelectFunc(index)">
                    <div class="emp-select-func flex-center"
                      :class="{ 'border-0075c0': isShowCustomerSelectFuncArray[index] }">
                      <div class="icons icon-angle-down"></div>
                      <div class="emp-drop-list" v-show="isShowCustomerSelectFuncArray[index]">
                        <div class="emp-drop-item">
                          <a href="">Nhân bản</a>
                        </div>
                        <div class="emp-drop-item" @click="() => deleteCustomerById(customer.CustomerId)"><a
                            href="">Xóa</a>
                        </div>
                        <div class="emp-drop-item">
                          <a href="">Ngừng sử dụng</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="emp-footer">
          <div class="emp-total">
            Tổng số: <strong class="emp-nums" style="font-weight: bold">
              {{ customerDataShow.length }}
            </strong>
            bản ghi
          </div>

          <div class="pagination-container">
            <div class="num-perpage-container">
              <div class="num-perpage">Số bản ghi/trang:
                <strong>{{ numCustomersDataShow }}</strong>
              </div>
              <div class="num-perpage-icon">
                <div class="icons num-perpage-angledown"></div>
              </div>
            </div>

            <div class="index-emp-container">
              <strong>{{ firstCustomerIndex }} - {{ lastCustomerIndex }}</strong>
              bản ghi
            </div>

            <div class="change-page-container">
              <div class="prev-page">
                <div class="icons prev-page-angle-blur"></div>
              </div>
              <div class="next-page">
                <div class="icons next-page-angle-right"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Bảng thông tin nhân viên -->
      </div>
    </div>
    <IsLoading v-if="isLoading"></IsLoading>
    <!-- <CustomerDetail v-if="isShowCustomerDetail" :content="customerDetail" :title="customerDetailTitle"></CustomerDetail> -->
    <router-view :title="customerDetailTitle"></router-view>
    <MNotificationDialog v-if="isShowNotificationDialog" :dialogContent="dialogContent" :onClose="closeDialog">
    </MNotificationDialog>
  </aside>
</template>
<script>
// import CustomerDetail from './CustomerDetail.vue'
import IsLoading from '../../components/base/misloading/MIsLoading.vue'
import CustomerListHandler from './customerlisthandler.js'
import axios from 'axios'
export default {
  name: "CustomerList",
  provide() {
    return {
      customerDetail: this.customerDetail,
      testProvide: "Minh Đăng"
    }
  },
  methods: {
    /**
     * Author: Minh Đăng 30/08/2023
     * Feat: Mở form thêm mới khách hàng
     */
    addNewCustomer() {
      this.customerDetailTitle = "Thêm mới khách hàng"
      this.customerDetail = {}
      this.$router.push(`/customers/form`);
    },
    showChangeCustomerDetail: CustomerListHandler.showChangeCustomerDetail,
    hideCustomerSelectFunc: CustomerListHandler.hideCustomerSelectFunc,
    clickCustomerSelectFunc: CustomerListHandler.clickCustomerSelectFunc,
    selectAllCustomer: CustomerListHandler.selectAllCustomer,
    selectOneCustomer: CustomerListHandler.selectOneCustomer,
    unselectedAllCustomer: CustomerListHandler.unselectedAllCustomer,

  },
  data() {
    return {
      isLoading: false,
      isShowCustomerDetail: false,
      isShowCustomerPerPageList: false,
      checkAllCustomerClass: false,
      isShowDialog: false,
      isShowNotificationDialog: false,
      allShempDataShows: {},
      customerDataShow: {},
      numCustomersDataShow: 10,
      // Mảng lưu trữ trạng thái ẩn hiện của các dropdown list trong mục chức năng trong bảng
      isShowCustomerSelectFuncArray: {},
      empSelectFuncId: -1,
      customerDetail: {},
      customerDetailTitle: "Thông tin khách hàng",
      isCustomerBatchExe: false, // Đánh dấu thực hiện hàng loạt
      isCustomerSelected: {}, // Đánh dấu nhân viên nào được chọn
      isSelectAllCustomer: false,
      numCustomerSelected: 0,
      isSelectAllCustomerCheckboxChecked: false,
      indexCustomerToChange: -1, // index của nhân viên được sửa đổi để binding dữ liệu
      dialogContent: {
        Title: "",
        Message: "",
        Icon: ""
      },

      firstCustomerIndex: 1,
      lastCustomerIndex: 10,
      formStatus: 0
    }
  },

  components: {
    // CustomerDetail,
    IsLoading
  },


  /**
   * Author: Minh Đăng 25/08/2023
   * Feat: Điều chỉnh thẻ input checkbox hợp lí khi click, disabled bảng khi chọn tất cả nhân viên
   */
  updated() {
    if (this.numCustomerSelected >= 2) {
      this.$refs.checkboxAllCustomer.checked = true;
    } else if (this.numCustomerSelected <= 1) {
      this.$refs.checkboxAllCustomer.checked = false;
    }
  },
  /**
   * Author: Minh Đăng 27/8/2023
   * Feat: Lấy dữ liệu nhân viên từ api
   */
  async beforeMount() {
    this.isLoading = true;
    const respone = await axios.get('https://cukcuk.manhnv.net/api/v1/customers');
    this.allCustomerDatas = respone.data.slice(0, 50)
    this.customerDataShow = this.allCustomerDatas.slice(0, this.numCustomersDataShow)
    if (this.customerDataShow.length < this.numCustomersDataShow) {
      this.numCustomersDataShow = this.customerDataShow.length
    }
    this.isCustomerSelected = new Array(this.customerDataShow.length).fill(false)
    this.firstCustomerIndex = 1;
    this.lastCustomerIndex = this.numCustomersDataShow;
    this.isLoading = false;
  }
}
</script>
<style></style>
