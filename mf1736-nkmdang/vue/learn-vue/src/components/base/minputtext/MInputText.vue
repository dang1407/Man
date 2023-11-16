<template>
  <div :style="{ width: width, height: height, margin: margin }">
    <div class="relative">
      <div class="flex">
        <label
          :class="[labelClass, hasToolTip]"
          @click="clickLabelForInput"
          style="font-weight: bold"
          >{{ label }}
        </label>
        <div class="icon__required" v-if="required">*</div>
      </div>

      <!-- <input
        class="minput--text"
        :class="{ input__missing: isMissingInput }"
        :type="type"
        ref="inputFocus"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      /> -->
      <input
        :class="{
          input__missing: isMissingInput || isError,
          'minput--text': true,
        }"
        @keydown="checkInputEmpty"
        :type="type"
        ref="inputFocus"
        :tabindex="tabindex"
        v-model="inputValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="selectAllText"
      />
      <!-- <input
        class="minput--text"
        :class="{ input__missing: isMissingInput }"
        @keydown="checkInputEmpty"
        :type="type"
        ref="inputFocus"
        :tabindex="tabindex"
        @focus="selectAllText"
        v-model="inputValue"
      /> -->
      <div class="tooltip-cont">
        <div class="tooltip-icon-box">
          <div class="tooltip-icon"></div>
        </div>
        <div class="tooltip-box">
          {{ tooltip }}
        </div>
      </div>

      <div class="" v-if="isShowErrorTooltip">
        <div class="tooltip-icon-box">
          <div class="tooltip-icon"></div>
        </div>
        <div class="tooltip-box">
          {{ errorTooltip }}
        </div>
      </div>
      <div class="label__missing" v-if="isMissingInput">
        {{ label }} không được để trống
      </div>

      <!-- <div
        class="tooltip-cont"
        style="display: block; transform: translateY(-50%)"
        v-if="isMissingInput"
      >
        <div class="tooltip-box">{{ label }} không được để trống.</div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import EmployeeResource from "../../../views/employee/employeeresource";
export default {
  props: [
    "type",
    "initValue",
    "label",
    "tooltip",
    "required",
    "width",
    "height",
    "labelClass",
    "margin",
    "focus",
    "modelValue",
    "missingInput",
    "tabindex",
    "isError",
  ],
  data() {
    return {
      hasToolTip: "",
      isMissingInput: false,
      valueInput: "",
      modelValueInput: this.modelValue,
      inputValue: "",
      isShowErrorTooltip: false,
      errorTooltip: "",
      inputTextResource: {
        VN: {
          TooLong: `${this.label} không thể quá ${this.maxLenght} kí tự`,
        },
        EN: {
          TooLong: `${this.label} cannot has more than ${this.maxLenght} characters`,
        },
      },
    };
  },
  expose: ["focusInput", "selectAllText"],
  methods: {
    /**
     * Hàm click vào label của thẻ input thì focus vào thẻ input
     * Created by: nkmdang 30/08/2023
     */
    clickLabelForInput() {
      this.$refs.inputFocus.focus();
    },

    handleInputValue() {
      // if (this.inputValue.length > this.maxLenght) {
      //   this.inputValue = this.inputValue.slice(0, this.maxLenght);
      //   this.errorTooltip = this.inputTextResource[this.$languageCode].TooLong;
      //   this.isMissingInput = true;
      // } else {
      //   this.isMissingInput = false;
      // }
      this.$emit("update:modelValue", $event.target.value);
    },

    selectAllText(e) {
      e.target.select();
    },
    focusInput() {
      this.$refs.inputFocus.focus();
    },
  },

  /**
   * Author: Minh Đăng 30/08/2023
   * Feat: Focus vào thẻ input khi thẻ input được đưa vào DOM
   */
  mounted() {
    // if (this.focus === true) {
    //   this.$refs.inputFocus.value = this.modelValue;
    //   // this.$nextTick(() => {
    //   //   this.$refs.inputFocus.focus();
    //   // });
    //   // this.$refs.inputFocus.select();
    // }

    if (this.modelValue) {
      this.inputValue = this.modelValue;
      if (this.focus == true) {
        this.$nextTick(() => {
          this.$refs.inputFocus.focus();
        });
      }
    }
    // if (this.focus == true) {
    //   this.$nextTick(() => {
    //     this.$refs.inputFocus.focus();
    //   });
    // }
    if (this.tooltip) {
      this.hasToolTip = "has-tooltip";
    }
  },
  watch: {
    modelValue(newValue) {
      if (this.required == "true") {
        if (newValue !== "") {
          this.isMissingInput = false;
          this.inputValue = newValue;
          if (this.focus == true) {
            this.$nextTick(() => {
              this.$refs.inputFocus.focus();
            });
          }
          // console.log(this.$refs.inputFocus.value);
        } else {
          this.isMissingInput = true;
        }
      }
    },
    missingInput() {
      if (this.missingInput === true) {
        this.isMissingInput = true;
      }
    },
  },
};
</script>

<style scoped>
/* CSS cho thẻ label */
label {
  display: flex;
  margin-bottom: 8px;
}
.has-tooltip:hover ~ .tooltip-cont {
  display: block;
}
/* CSS cho thẻ label */

.minput--text {
  width: 100%;
  height: 36px;
  padding: 0px 8px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.minput--text::placeholder {
  color: #999999;
  font-size: 14px;
}

.minput--text:hover {
  background-color: #f6f6f6;
  /* cursor: pointer; */
  border-color: #ebebeb;
}

.minput--text:focus {
  border: 1px solid #50b83c;
  outline: none;
}

:root {
  --color-tooltip: #333;
  --height-tooltip-icon: 8px;
}
.tooltip-cont {
  display: none;
  position: absolute;
  min-width: 100px;
  width: 100%;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  /* max-width: 100%; */
  z-index: 3;
}

.tooltip-icon-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: -4px;
}

.tooltip-icon {
  transform: rotate(45deg);
  width: var(--height-tooltip-icon);
  height: var(--height-tooltip-icon);
  background-color: var(--color-tooltip);
}

.tooltip-box {
  border-radius: 4px;
  /* width: auto; */
  text-align: center;
  background-color: var(--color-tooltip);
  color: #ddd;
  padding: 3px 5px;
}

.input__missing {
  border-color: #e61d1d;
}
</style>
