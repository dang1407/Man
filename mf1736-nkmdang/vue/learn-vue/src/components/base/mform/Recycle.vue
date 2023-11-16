<template>
  <div>
    <div class="mform--halfcontainer">
      <!--Begin: Left -->
      <div class="mform--halfbox" style="padding-right: 20px">
        <div class="mform--halfitems">
          <div class="mform--halfitem__left" style="width: 40%">
            <MInputText label="Mã" required="true"></MInputText>
          </div>
          <div class="mform--halfitem__right" style="width: 60%">
            <MInputText label="Tên" required="true"></MInputText>
          </div>
        </div>
        <div class="mform--fullitems">
          <label class="flex"
            >Đơn vị
            <div class="icon__required">*</div></label
          >
          <MSCombobox></MSCombobox>
        </div>
        <div class="mform--fullitems">
          <MInputText label="Chức danh"></MInputText>
        </div>
      </div>
      <!-- End: Left -->

      <!-- Begin: Right -->
      <div class="mform--halfbox">
        <div class="mform--halfitems">
          <div class="mform--halfitem__left">
            <label class="flex">Ngày sinh</label>
            <MDatePicker></MDatePicker>
          </div>
          <div class="mform--halfitem__right"></div>
        </div>
        <div class="mform--halfitems">
          <div class="mform--halfitem__left" style="width: calc(100% - 150px)">
            <MInputText label="Số CMND" tooltip="Số chứng minh thư nhân dân">
            </MInputText>
          </div>
          <div class="mform--halfitem__right" style="width: 150px">
            <label class="flex">Ngày cấp</label>
            <MDatePicker></MDatePicker>
          </div>
        </div>
        <div class="mform--fullitems">
          <MInputText label="Nơi cấp"></MInputText>
        </div>
      </div>
      <!-- End: Right -->
    </div>
    <div class="mform--halfcontainer">
      <div class="mform--fullbox">
        <MInputText label="Địa chỉ" width="100%"></MInputText>
      </div>
    </div>

    <div class="mform--table">
      <div class="mform--row">
        <div class="mform--td">
          <MInputText
            label="ĐT Di động"
            tooltip="Điện thoại di động"
          ></MInputText>
        </div>
        <div class="mform--td">
          <MInputText
            label="ĐT cố định"
            tooltip="Điện thoại cố định"
          ></MInputText>
        </div>
        <div class="mform--td">
          <MInputText label="Email"></MInputText>
        </div>
      </div>
      <div class="mform--row"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecycleBin",
};
</script>
<style></style>
