<template>
  <div class="emp-detail-container">
    <div class="emp-detail-box">
      <div class="emp-detail-head flex">
        <div class="emp-detail-title flex">
          <h1>{{ title || "Thêm mới nhân viên" }} </h1>
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
          <div class="icons-box relative" @click="closeCustomerForm">
            <div class="emp-detail-close icons"></div>

            <div class="tooltip-cont">
              <div class="tooltip-icon-box">
                <div class="tooltip-icon"></div>
              </div>
              <div class="tooltip-box" style="width: 80px">
                Đóng (ESC)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="emp-detail-body">
        <div class="emp-detail-form">
          <div class="emp-detail-left">
            <div class="emp-left-head">
              <div class="emp-detail-half-box" style="margin-right: 10px; width: 30%">
                <label for="" class="flex">
                  Mã
                  <div class="icons-align-center-box">
                    <i class="fa-solid fa-star"></i>
                  </div>
                </label>
                <MInputField tabindex="1" v-model="customerFormData.CustomerCode"
                  :initValue="customerFormData.CustomerCode" :focus="true">
                </MInputField>
                <!-- <div>{{ customerFormData.CustomerCode }}</div> -->
                <!-- <input type="text" class="input-text emp-code" tabindex="1" v-model="empCodeOuput" /> -->
              </div>
              <div class="emp-detail-half-box" style="width: 70%">
                <label for="">Tên
                  <div class="icons-align-center-box">
                    <i class="fa-solid fa-star"></i>
                  </div>
                </label>
                <MInputField v-model="customerFormData.FullName" :initValue="customerFormData.FullName">
                </MInputField>
                <!-- <input type="text" class="input-text" style="width: 100%" :value="customerFormData.empName" tabindex="2" /> -->
              </div>
            </div>

            <div class="emp-detail-full-box">
              <label style="margin-top: 15px" for="">Số điện thoại
                <div class="icons-align-center-box">
                  <i class="fa-solid fa-star"></i>
                </div>
              </label>
              <MInputField v-model="customerFormData.PhoneNumber" :initValue="customerFormData.PhoneNumber">
              </MInputField>
              <!-- <div>{{ customerFormData.positionName }}</div> -->
              <!-- <input type="text" class="input-text" tabindex="4" /> -->
            </div>
            <div class="emp-detail-full-box">
              <label style="margin-top: 15px" for="">Email
              </label>
              <MInputField v-model="customerFormData.Email" :initValue="customerFormData.Email"></MInputField>
              <!-- <div>{{ customerFormData.positionName }}</div> -->
              <!-- <input type="text" class="input-text" tabindex="4" /> -->
            </div>
          </div>
          <div class="emp-detail-right">
            <div class="emp-right-head">
              <div class="emp-detail-half-box" style="width: 35%">
                <label for="" class="flex">Ngày sinh </label>


                <MDatePicker :initDate="this.$helper.formatDate(customerFormData.DateOfBirth)" :tabindex="5">
                </MDatePicker>
              </div>

              <div class="emp-detail-half-box" style="margin-left: 10px">
                <label for="" class="flex">Giới tính </label>

                <div class="radio-container flex align-center" style="margin-left: 0">

                  <MInputRadio :tabindex="6" :name="'gender'" valueInput="Nam"
                    :valueChecked="customerFormData.GenderName">
                  </MInputRadio>
                  <span class="gender">Nam</span>

                  <!-- <MInputRadio :name="'gender'" valueInput="Nữ" :valueChecked="customerFormData.GenderName"></MInputRadio>
                  <span class="gender">Nữ</span>

                  <MInputRadio :name="'gender'" valueInput="Khác" :valueChecked="customerFormData.GenderName">
                  </MInputRadio>
                  <span class="gender">Khác</span> -->
                </div>
              </div>
            </div>

            <div class="emp-left-head" style="margin-top: 15px">
              <div class="emp-detail-half-box relative" style="width: calc(100%)">
                <label for="" class="icons">Số CMND </label>
                <div class="tooltip-cont">
                  <div class="tooltip-icon-box">
                    <div class="tooltip-icon"></div>
                  </div>
                  <div class="tooltip-box" style="width: 150px">
                    Số chứng minh thư nhân dân
                  </div>
                </div>
                <MInputField :tabindex="7"></MInputField>
                <!-- <input type="text" class="input-text" style="width: 100%" :value="content.empCCCD" tabindex="7" /> -->
              </div>
              <div class="emp-detail-half-box" style="margin-left: 10px">
                <label for="" class="flex">Ngày cấp </label>
                <MDatePicker :tabindex="8"></MDatePicker>
              </div>
            </div>
            <div class="emp-detail-full-box" style="margin-top: 15px">
              <label for="">Nơi cấp</label>
              <MInputField :tabindex="9"></MInputField>
              <!-- <input type="text" class="input-text" tabindex="9" /> -->
            </div>
          </div>
        </div>
      </div>

      <div class="emp-detail-footer">
        <div class="emp-detail-full-box" style="margin-top: 5px">
          <label for="">Số tiền nợ</label>
          <MInputField :tabindex="10" v-model="customerFormData.DebitAmount" :initValue="customerFormData.DebitAmount">
          </MInputField>
          <!-- <input type="text" class="input-text" tabindex="10" /> -->
        </div>
        <div class="emp-detail-full-box" style="margin-top: 5px">
          <label for="">Công ty</label>
          <MInputField :tabindex="10"></MInputField>
          <!-- <input type="text" class="input-text" tabindex="10" /> -->
        </div>
        <div class="emp-detail-full-box" style="margin-top: 5px">
          <label for="">Địa chỉ</label>
          <MInputField :tabindex="10"></MInputField>
          <!-- <input type="text" class="input-text" tabindex="10" /> -->
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
              <MButton class="bg-white mr-8" @click="saveNewCustomer">Cất</MButton>
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
    <MToastMessage v-if="isShowToastMessage" :onClose="hideToastMessage" :toastMesContent="toastMesContent">
    </MToastMessage>
    <MNotificationDialog v-if="isShowNotificationDialog" :dialogContent="dialogContent"
      :onClose="closeNotificationDialog">
    </MNotificationDialog>
    <MIsLoading v-if="isLoading"></MIsLoading>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import MNotificationDialog from '../../components/base/mdialog/MNotificationDialog.vue';

// import { onMounted } from 'vue';
// import axios from 'axios';
import CustomerListHandler from './customerlisthandler'
export default {
  components: { MNotificationDialog },
  props: {
    clickClose: {},
    content: {
      default: {}
    },
    title: {}
  },
  data() {
    return {
      // isShowEmpDetail: false,
      isLoading: false,
      isShowToastMessage: false,
      empCodeOuput: this.content.empCode,
      customerFormData: {
        CustomerCode: "",
        FullName: "",
        PhoneNumber: "",
        GenderName: "",
        PositionName: ""
      },
      isShowNotificationDialog: false,
      toastMesContent: {
        Status: "",
        Desc: "",
        TextClass: "",
        OptionAction: "",
        Icon: ""
      },
      dialogContent: {},
      customerDetail: {
        CustomerCode: "",
        PhoneNumber: "",
        FullName: "",
      }
    };
  },
  methods: {
    hideToastMessage: CustomerListHandler.hideToastMessage,
    axiosPosCustomerErrorHandler: CustomerListHandler.axiosPosCustomerErrorHandler,
    saveNewCustomer: CustomerListHandler.saveNewCustomer,
    closeNotificationDialog: CustomerListHandler.closeNotificationDialog,
    closeCustomerForm: CustomerListHandler.closeCustomerForm,
    beforePostCustomer: CustomerListHandler.beforePostCustomer,
    afterPostCustomer: CustomerListHandler.afterPostCustomer
  },

  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Gán giá trị content cho customerFormData để đưa dữ liệu vào bảng
   */
  async created() {
    const id = this.$route.params.id;
    if (id) {
      this.isLoading = true;
      const respone = await this.$axios.GET(`https://cukcuk.manhnv.net/api/v1/customers/${id}`)
      this.customerFormData = respone.data;
      this.isLoading = false
    }
  },

};
</script>
<style></style>
