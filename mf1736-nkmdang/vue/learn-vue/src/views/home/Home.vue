<template>
  <div>
    Đây là trang Home
    <flatPickr></flatPickr>
  </div>
</template>
<script>
import "@vuepic/vue-datepicker/dist/main.css";
import flatPickr from "vue-flatpickr-component";
import Datepicker from "vuejs3-datepicker";
import MDatePicker from "../../components/base/mdatepicker/MDatePicker.vue";
export default {
  name: "HomeView",
  data() {
    return {
      x: 0,
      y: 0,
      flatpickrConfig: {
        dateFormat: "d/m/Y",
        locale: {
          firstDayOfWeek: 1, // Bắt đầu từ thứ 2 (ngày đầu tiên của tuần)
          weekdays: {
            shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            longhand: [
              "Chủ Nhật",
              "Thứ Hai",
              "Thứ Ba",
              "Thứ Tư",
              "Thứ Năm",
              "Thứ Sáu",
              "Thứ Bảy",
            ],
          },
          months: {
            shorthand: [
              "Th1",
              "Th2",
              "Th3",
              "Th4",
              "Th5",
              "Th6",
              "Th7",
              "Th8",
              "Th9",
              "Th10",
              "Th11",
              "Th12",
            ],
            longhand: [
              "Tháng Một",
              "Tháng Hai",
              "Tháng Ba",
              "Tháng Tư",
              "Tháng Năm",
              "Tháng Sáu",
              "Tháng Bảy",
              "Tháng Tám",
              "Tháng Chín",
              "Tháng Mười",
              "Tháng Mười Một",
              "Tháng Mười Hai",
            ],
          },
        },
        allowInput: true,
      },
    };
  },
  methods: {
    update(event) {
      this.x = event.pageX;
      this.y = event.pageY;
    },
  },
  onMounted() {
    window.addEventListener("mousemove", this.update);
  },
  onUnmounted() {
    window.removeEventListener("mousemove", this.update);
  },
  components: {
    Datepicker,
    MDatePicker,
    flatPickr,
  },
};
</script>
<style>
.flatpickr-input {
  height: 36px;
  min-width: 80px;
  border-radius: 4px;
  padding-left: 8px;
}
</style>
