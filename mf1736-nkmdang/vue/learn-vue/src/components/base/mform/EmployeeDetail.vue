<template>
  <div>
    <m-form title="Thông tin nhân viên">
      <template v-slot:MFormBody>
        <div class="flex">
          <div class="mform--half" style="margin-right: 10px">
            <div class="mform--half__item flex">
              <div style="width: 40%; margin-right: 10px">
                <m-input-text label="Mã" required="true"></m-input-text>
              </div>
              <div style="width: 60%">
                <m-input-text label="Tên" required="true"></m-input-text>
              </div>
            </div>
            <div class="mform--half__item">
              <div style="margin-bottom: 5px; font-weight: bold" class="flex">
                Đơn vị
                <div class="icon__required">*</div>
              </div>
              <MComboBox></MComboBox>
            </div>
            <div class="mform--half__item">
              <m-input-text label="Chức danh"></m-input-text>
            </div>
          </div>
          <div class="mform--half" style="margin-left: 10px">
            <div class="mform--half__item flex">
              <div>
                <div style="margin-bottom: 5px; font-weight: bold">
                  Ngày sinh
                </div>
                <m-date-picker></m-date-picker>
              </div>
              <div style="margin-left: 10px">
                <div style="font-weight: bold; margin-bottom: 5px">
                  Giới tính
                </div>

                <div
                  class="radio-container flex align-center"
                  style="margin-left: 0"
                >
                  <MInputRadio :tabindex="6" :name="'gender'" valueInput="Nam">
                  </MInputRadio>
                  <span class="gender">Nam</span>
                  <MInputRadio :name="'gender'" valueInput="Nữ"></MInputRadio>
                  <span class="gender">Nữ</span>

                  <MInputRadio :name="'gender'" valueInput="Khác"></MInputRadio>
                  <span class="gender">Khác</span>
                </div>
              </div>
            </div>
            <div class="mform--half__item flex">
              <div style="width: calc(100% - 150px)">
                <m-input-text
                  label="Số CMND"
                  tooltip="Số chứng minh thư nhân dân"
                ></m-input-text>
              </div>
              <div style="margin-left: 10px">
                <div class="datepicker--label">Ngày cấp</div>
                <m-date-picker></m-date-picker>
              </div>
            </div>
            <div class="mform--half__item">
              <div>
                <m-input-text label="Nơi cấp"></m-input-text>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 45px">
          <!-- ĐT cố định, ĐT di động, Email -->
          <div style="margin-top: 15px">
            <m-input-text label="Địa chỉ"></m-input-text>
          </div>

          <div style="margin-top: 15px">
            <div class="flex">
              <div class="mfrom--col3__item">
                <m-input-text
                  label="ĐT cố định"
                  tooltip="Điện thoại cố định"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text
                  label="ĐT di động"
                  tooltip="Điện thoại di động"
                ></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text label="Email"></m-input-text>
              </div>
            </div>
          </div>

          <!-- TK ngân hàng, tên ngân hàng, chi nhánh -->
          <div style="margin-top: 15px">
            <div class="flex">
              <div class="mfrom--col3__item">
                <m-input-text label="Tài khoản ngân hàng"></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text label="Tên ngân hàng"></m-input-text>
              </div>
              <div class="mfrom--col3__item">
                <m-input-text label="Chi nhánh"></m-input-text>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:MFormFooter>
        <div class="mform--footer">
          <div>
            <MButton class="bg-white">Hủy</MButton>
          </div>
          <div class="flex">
            <div style="margin-right: 10px">
              <m-button class="bg-white">Cất</m-button>
            </div>
            <div>
              <m-button>Cất và thêm</m-button>
            </div>
          </div>
        </div>
      </template>
    </m-form>
  </div>
</template>
<script>
import MForm from "./MForm.vue";
export default {
  components: { MForm },
};
</script>
<style scoped>
.mform--half {
  width: 50%;
}
.mform--half__item {
  margin-top: 15px;
}
.mfrom--col3__item {
  margin-right: 10px;
}
.datepicker--label {
  font-weight: bold;
  margin-bottom: 5px;
}

.mform--footer {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
}
</style>
