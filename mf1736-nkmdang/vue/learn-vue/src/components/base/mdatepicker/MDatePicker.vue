<template>
  <div class="relative">
    <div class="datepicker-container">
      <div
        style="margin-bottom: 8px; font-weight: bold; cursor: default"
        for="datepickerInput"
        @click="clickLabelFocusInput"
      >
        {{ label }}
      </div>
      <div class="relative">
        <div
          class="datepicker-box"
          :class="{ 'border--50b83c': isFocus, date__error: isErrorDate }"
        >
          <div class="datepicker-input">
            <!-- <input
            type="date"
            class=""
            ref="inputDate"
            :value="initDate"
            @input="$emit('update:modelValue', $event.target.value)"
            @focus="onFocus"
            @blur="onUnFocus"
            placeholder="DD/MM/YYYY"
          /> -->
            <input
              ref="inputText"
              class="input__date--text"
              placeholder="DD/MM/YYYY"
              type="text"
              v-model="date"
              @focus="onFocus"
              @blur="onUnFocus"
              @input="handleChangeInputText"
              :tabindex="tabindex"
            />

            <VFlatPickr
              ref="VFlatPickr"
              :config="datePickerConfig"
              v-model="dateFlatPicker"
              @onChange="handleSelected"
            ></VFlatPickr>
          </div>
          <div class="date-icon" @click="openCalendar">
            <div class="icons-align-center-box">
              <div class="icons icon-calendar"></div>
            </div>
          </div>
        </div>

        <!-- <div class="calendar__container">
        <div class="calendar__box">
          <div class="calendar__header">
            <div class="calendar__monthbox">
              <div class="calendar__month">Tháng 9, 2023</div>
              <div class="calendar--icon icon-box">
                <div class="icons icon--1129-365"></div>
              </div>
            </div>
            <div class="calendar__buttonbox">
              <div class="icon-box calendar__button--prev">
                <div class="icons icon--36-361"></div>
              </div>
              <div class="icon-box calendar__button--next">
                <div class="icons icon--84-361"></div>
              </div>
            </div>
          </div>
          <div class="calendar__body">
            <div class="weekdays__container">
              <div class="weekdays__item">T2</div>
              <div class="weekdays__item">T3</div>
              <div class="weekdays__item">T4</div>
              <div class="weekdays__item">T5</div>
              <div class="weekdays__item">T6</div>
              <div class="weekdays__item">T7</div>
              <div class="weekdays__item">CN</div>
            </div>

            <div class="days__container">
              <div class="days__row">
                <div class="days__item">1</div>
                <div class="days__item">2</div>
                <div class="days__item">3</div>
                <div class="days__item">4</div>
                <div class="days__item">5</div>
                <div class="days__item">6</div>
                <div class="days__item">7</div>
              </div>
              <div class="days__row">
                <div class="days__item">1</div>
                <div class="days__item">2</div>
                <div class="days__item">3</div>
                <div class="days__item">4</div>
                <div class="days__item">5</div>
                <div class="days__item">6</div>
                <div class="days__item">7</div>
              </div>
              <div class="days__row">
                <div class="days__item">1</div>
                <div class="days__item">2</div>
                <div class="days__item">3</div>
                <div class="days__item">4</div>
                <div class="days__item">5</div>
                <div class="days__item">6</div>
                <div class="days__item">7</div>
              </div>
              <div class="days__row">
                <div class="days__item">1</div>
                <div class="days__item">2</div>
                <div class="days__item">3</div>
                <div class="days__item">4</div>
                <div class="days__item">5</div>
                <div class="days__item">6</div>
                <div class="days__item">7</div>
              </div>
            </div>
          </div>
        </div>
        <div class="hr">
          <hr />
        </div>
        <div class="calendar__footer">
          <div class="calendar__date today">Hôm nay</div>
        </div>
      </div> -->
      </div>
    </div>
    <div class="datepicker__container--tooltip" v-if="isShowTooltip">
      <div class="tooltip-icon-box">
        <div class="tooltip-icon"></div>
      </div>
      <div class="tooltip-box">
        {{ tooltip }}
      </div>
    </div>
  </div>
</template>
<script>
// import "@vuepic/vue-datepicker/dist/main.css";
import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
export default {
  props: ["initDate", "tabindex", "label", "value"],
  inject: ["config"],
  data() {
    return {
      modelDatePicker: new Date(),
      isFocus: false,
      inputTextValue: "",
      isErrorDate: false,
      calendar: {
        type: Object,
      },
      date: null,
      dateFlatPicker: null,
      datePickerConfig: {
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
        dateFormat: "d/m/Y",
      },
      tooltip: "",
      tooltipResource: {
        NotNumberKey: "Bạn nhập lần lượt ngày, tháng, năm bằng các con số nhé!",
        NotValidateDate: `${this.label} phải có định dạng DD/MM/YYYY bạn nhé!`,
        DateGreaterThanToday: `Bạn không thể nhập ${this.label} lớn hơn ngày hiện tại!`,
      },
      isShowTooltip: false,
    };
  },
  watch: {},
  methods: {
    /**
     * Khi thẻ input được focus thì datepicker cũng đổi màu border
     * Author: nkmdang (14/09/2023)
     */
    onFocus(e) {
      e.target.select();
      this.isFocus = true;
    },
    /**
     * Bỏ màu border datepicker khi thẻ input không được focus
     * Author: nkmdang (14/09/2023)
     */
    onUnFocus() {
      this.isFocus = false;
      const isValidateDate = this.$helper.isValidDate(this.date);
      if (isValidateDate) {
        this.dateFlatPicker = this.date;
      } else {
        this.dateFlatPicker = null;
      }
      // console.log(this.$helper.convertDateToDateTime(this.dateFlatPicker));
      // this.date = this.dateFlatPicker;
      this.updateModelValue();
    },

    /**
     * Focus vào thẻ input khi bấm vào label
     * Author: nkmdang (14/09/2023)
     */
    clickLabelFocusInput() {
      this.$refs.inputText.focus();
    },

    /**
     * Hàm mở phần chọn ngày của datepicker
     * Created by: nkmdang (1/10/2023)
     */
    openCalendar() {
      this.$refs.VFlatPickr.fp.open();
    },

    /**
     * Hàm xử lý chọn ngày không quá ngày hiện tại
     * Created by: nkmdang (1/10/2023)
     */
    handleSelected() {
      this.isShowTooltip = false;
      this.date = this.dateFlatPicker;
      // if (!this.handleDateGreaterThanToday()) {
      //   return;
      // }
      this.handleDateGreaterThanToday();
      this.updateModelValue();
    },

    /**
     * Khi input blur thì binding dữ liệu lên cha
     * Created by: nkmdang (1/10/2023)
     */
    unFocusInputText() {
      this.$refs.inputText.blur();
      this.updateModelValue();
    },

    /**
     * Binding dữ liệu ngày lên cha theo định dạng Datetime để có thể fetch API
     * Created by: nkmdang (1/10/2023)
     */
    updateModelValue() {
      this.$emit(
        "update:modelValue",
        this.$helper.convertDateToDateTime(this.dateFlatPicker)
      );
    },

    /**
     * Hàm kiểm tra ngày nhập vào có lớn hơn ngày hiện tại không
     * Return: true nếu lớn hơn, false nếu không
     * Created by: nkmdang (1/10/2023)
     * @param {string} dateString Ngày tháng đầu vào định dạng "DD/MM/YYYY"
     */
    isDateGreaterThanToday(dateString) {
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const parts = dateString.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1] - 1, 10); // Giảm 1 vì tháng trong Date bắt đầu từ 0
      const year = parseInt(parts[2], 10);
      const inputDate = new Date(year, month, day);

      // Lấy ngày hiện tại
      const today = new Date();

      // So sánh ngày
      return inputDate > today;
    },

    /**
     * Hàm mở tooltip khi người dùng nhập ngày quá ngày hiện tại
     * Created by: nkmdang (1/10/2023)
     */
    handleDateGreaterThanToday() {
      if (this.isDateGreaterThanToday(this.date)) {
        this.openTooltip(this.tooltipResource.DateGreaterThanToday);
        this.isErrorDate = true;
        // this.date = "";
        // this.dateFlatPicker = null;
        setTimeout(() => (this.isShowTooltip = false), 10000);
        return false;
      } else {
        this.isErrorDate = false;
      }
      return true;
    },

    /**
     * Hàm xử lý nhập liệu chỉ cho người dùng nhập chữ số và dấu /
     * Created by: nkmdang (1/10/2023)
     */
    handleChangeInputText() {
      const lengthText = this.date.length;
      // Kiểm tra xem người dùng nhập vào có phải là chữ số hay không
      const isNumber = /^\d+$/.test(this.date[this.date.length - 1]);
      if (lengthText > 0) {
        if (!isNumber && this.date.slice(-1) != "/") {
          // this.date = this.date.substring(0, lengthText - 1);
          this.openTooltip(this.tooltipResource.NotNumberKey);
          this.isErrorDate = true;
        } else {
          this.isShowTooltip = false;
          this.isErrorDate = false;
        }
      }

      // if (lengthText == 2 || lengthText == 5) {
      //   this.date += "/";
      // }
      if (lengthText >= 10) {
        this.date = this.date.substring(0, 10);
        this.handleDateGreaterThanToday();
      }
    },

    /**
     * Hàm gán nội dung và mở tooltip, nếu không truyền nội dung thì không mở
     * Created by: nkmdang (1/10/2023)
     * @param {string} content Nội dung tooltip
     */
    openTooltip(content) {
      if (content) {
        this.tooltip = content;
        this.isShowTooltip = true;
      }
    },
    clearDatePickerValue() {
      this.date = "";
      // this.dateFlatPicker = null;
    },
  },
  created() {
    this.modelDatePicker = this.initDate;
    this.$emitter.on("clearDatePickerValue", this.clearDatePickerValue);
    if (this.initDate) {
      this.dateFlatPicker = this.$helper.covertDateDBToDatePickerDate(
        this.initDate
      );
      this.date = this.dateFlatPicker;
    }
    let datePickerDateFormat = this.config.DatePattern;

    // Chỉnh định dạng ngày từ dd về d
    datePickerDateFormat = datePickerDateFormat.replace("dd", "d");

    // Chỉnh định dạng tháng MM về m
    datePickerDateFormat = datePickerDateFormat.replace("MM", "m");

    // Chỉnh định dạng năm
    datePickerDateFormat = datePickerDateFormat.replace("yyyy", "Y");
    this.datePickerConfig.dateFormat = datePickerDateFormat;
  },
  beforeUnmount() {
    this.$emitter.off("clearDatePickerValue");
    // flatpickr();
  },

  components: {
    VFlatPickr: flatPickr,
  },
};
</script>
<style scoped>
@import url(./mdatepicker.css);

/* Tùy chỉnh CSS để tạo giao diện placeholder */
label[for="datepicker"] {
  position: absolute;
  top: 70%;
  left: 0;
  padding: 10px;
  color: #999;
  pointer-events: none;
  transition: 0.2s ease-out;
}

#datepicker:focus + label[for="datepicker"],
#datepicker.has-value + label[for="datepicker"] {
  top: -20px;
  font-size: 12px;
  color: #333;
}

/* Tooltip */
.datepicker__container--tooltip {
  position: absolute;
  z-index: 1000;
  animation: slide-in 0.3s ease-in-out forwards;
}

@keyframes slide-in {
  0% {
    /* transform: translateY(100%); */
    opacity: 0;
  }
  100% {
    /* transform: translateY(0); */
    opacity: 1;
  }
}

.date__error {
  border-color: #e61d1d;
}
</style>
