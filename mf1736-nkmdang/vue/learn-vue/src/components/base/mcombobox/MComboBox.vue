<template>
  <div class="combobox-container" v-click-outside="closeComboboxDropList">
    <div class="flex">
      <label style="font-weight: bold" @click.stop="clickLabelFocusInput">
        {{ label }}
      </label>
      <div class="icon__required" v-if="required">*</div>
    </div>
    <div class="relative">
      <div
        class="combobox-box"
        :class="{ active: isActive, 'border-e61d1d': isMissingInput }"
      >
        <div class="combobox-input">
          <!-- <input
            type="text"
            :tabindex="tabindex"
            :disabled="disabled"
            :class="textClass"
            ref="inputText"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @focus="onActive"
            @blur="onUnActive"
          /> -->
          <input
            type="text"
            :tabindex="tabindex"
            :disabled="disabled"
            :class="textClass"
            ref="inputText"
            v-model="inputTextValue"
            @input="inputCombobox"
            @focus="onActive"
            @blur="onUnActive"
            @keydown="handleKeyDown"
            @click.stop=""
          />
        </div>
        <div class="combobox-sub-cont" @click.stop="clickComboboxDropList">
          <div class="icons-align-center-box">
            <div class="icons icon__vdown"></div>
          </div>
        </div>
      </div>
      <div class="label__missing" v-if="isMissingInput">
        {{ label }} không được để trống
      </div>
      <div class="combobox-droplist-cont" v-show="isShowComboboxDropList">
        <div class="combobox-droplist-box" @click.stop="">
          <div
            v-for="(option, index) in localListOptions"
            :key="option"
            :class="{
              'option--selected': optionSelected == option,
              'combobox-drop-item--hover': optionHoverIndex === index,
            }"
            @click.stop="selectOption(option, index)"
          >
            <div class="combobox-droplist-item">
              <div>
                {{ option }}
              </div>
              <div
                v-if="optionSelected == option"
                style="display: flex; align-items: center"
              >
                <div class="icons icon--ticked"></div>
              </div>
            </div>
          </div>

          <div class="combobox-droplist-item" v-if="isNotFoundSearch">
            <div>Không có {{ optionName }} khớp với bạn nhập</div>
          </div>
        </div>
      </div>

      <!-- <div
        class="combobox-droplist-cont"
        v-if="isShowComboboxDropList && localListOptions?.length == 0"
      >
        <div class="combobox-droplist-box">
          <div class="combobox-droplist-item">Không có lựa chọn</div>
        </div>
      </div> -->
      <!-- Danh sách droplist hiển thị kết quả tìm kiếm -->
      <!-- <div class="combobox-droplist-cont" v-if="isShowComboboxSearchList">
        <div class="combobox-droplist-box">
          
          <div
            class="combobox-droplist-item"
            v-for="(option, index) in localListOptions"
            :key="index"
            :class="{
              'option--selected': isSearchSelected[index],
              'option--focus': index == indexFocus,
            }"
            @click="selectOption(option, index)"
          >
            <div>
              {{ option }}
            </div>
            <div
              v-show="isSearchSelected[index]"
              style="display: flex; align-items: center"
            >
              <div class="icons icon--ticked"></div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: [
    "tabindex",
    "initValue",
    "disabled",
    "textClass",
    "label",
    "required",
    "missingInput",
    "modelValue",
    "listOptions",
    "optionName",
  ],
  data() {
    return {
      localListOptions: this.listOptions,
      isShowComboboxDropList: false,
      isShowComboboxSearchList: false,
      isActive: false,
      isMissingInput: this.missingInput,
      indexFocus: -1,
      isSelected: [],

      // Mảng lưu các option hiện ra, các option ko khớp sẽ bị ẩn ko biến mất
      // isShowOption: new Array(this.listOptions.length).fill(true),
      isNotFoundSearch: false,
      inputTextValue: "",
      optionSelected: "",
      optionHoverIndex: -1,
    };
  },
  methods: {
    /**
     * Author: Minh Đăng 5/9/2023
     * Feat: Ẩn hiện thị droplist
     */
    clickComboboxDropList() {
      if (this.localListOptions.length == this.listOptions.length)
        this.isShowComboboxDropList = !this.isShowComboboxDropList;
      else this.isShowComboboxDropList = true;

      this.localListOptions = this.listOptions;
      // this.isShowOption = new Array(this.isShowOption.length).fill(
      //   this.isShowComboboxDropList
      // );
      this.isActive = this.isShowComboboxDropList;
    },
    /**
     * Active combobox chuyển màu border sang xanh
     * Author: nkmdang (05/09/2023)
     */
    onActive(e) {
      this.isActive = true;
      e.target.select();
      // this.inputCombobox();
    },
    /**
     * Bỏ border màu xanh khi không còn active vào thẻ input nữa
     * Author: nkmdang (05/09/2023)
     */
    onUnActive() {
      this.$emit("update:modelValue", this.inputTextValue);
      if (this.inputTextValue === "") {
        this.selectOption = undefined;
      }
      this.isActive = false;
      // setTimeout(() => (this.isShowComboboxDropList = false), 150);
    },
    inputCombobox() {
      // console.log(newValue.target.value);
      // this.isShowComboboxDropList = false;
      // if (newValue.target.value != "") {
      //   this.isShowComboboxSearchList = true;
      // }
      // const value = newValue.target.value;
      // console.log(this.inputTextValue);
      this.isShowComboboxDropList = true;
      // this.isNotFoundSearch = true;
      // this.isShowOption = new Array(this.isShowOption.length).fill(false);
      this.localListOptions = this.listOptions.filter((option) =>
        option.includes(this.inputTextValue)
      );
      if (this.localListOptions.length == 0) {
        this.isNotFoundSearch = true;
      } else {
        this.isNotFoundSearch = false;
      }
    },
    /**
     * Lựa chọn option trong combobox, tô màu xanh và đổi màu chữ
     * Author: nkmdang (19/09/2023)
     */
    selectOption(option, index) {
      this.$emit("onSelectedComboBoxOption");
      this.$refs.inputText.blur();
      this.isActive = false;
      this.optionHoverIndex = -1;
      this.optionSelected = option;
      this.isShowComboboxDropList = false;
      this.inputTextValue = option;
      this.$emit("update:modelValue", option);
    },

    getIsShowOption(index) {
      return this.isShowOption[index];
    },

    /**
     * Hàm click vào label thì thẻ input focus
     * Created by: nkmdang (1/10/2023)
     */
    clickLabelFocusInput() {
      this.$refs.inputText.focus();
    },

    /**
     * Xử lý các thao tác phím của người dùng
     * @param {Object} e Sự kiện bàn phím
     *
     * Created by: nkmdang 02/10/2023
     */
    handleKeyDown(e) {
      // console.log(e.key);
      if (e.key === "ArrowDown") {
        this.optionHoverIndex =
          (this.optionHoverIndex + 1) % this.localListOptions.length;
      } else if (e.key == "ArrowUp") {
        if (this.optionHoverIndex > 0) {
          this.optionHoverIndex =
            (this.optionHoverIndex - 1) % this.localListOptions.length;
        } else {
          this.optionHoverIndex =
            (this.optionHoverIndex - 1 + this.localListOptions.length) %
            this.localListOptions.length;
        }
      } else if (e.key == "ArrowRight") {
        this.localListOptions = this.listOptions;
        this.isShowComboboxDropList = true;
      } else if (e.key === "Enter") {
        this.selectOption(
          this.localListOptions[this.optionHoverIndex],
          this.optionHoverIndex
        );
        this.$refs.inputText.focus();
        this.isActive = true;
      }
      if (e.key === "Tab") {
        this.isShowComboboxDropList = false;
      }
    },

    resetOptionHoverIndex() {},

    /**
     * Xóa dữ liệu của combobox khi form load lại
     *
     * Created by: nkmdang 02/10/2023
     */
    clearComboboxValue() {
      this.inputTextValue = "";
      this.optionHoverIndex = -1;
      this.optionSelected = undefined;
    },

    /**
     * Đóng danh sách lựa chọn khi click ra ngoài combobox
     *
     * Created by: nkmdang 05/10/2023
     */
    closeComboboxDropList() {
      this.isShowComboboxDropList = false;
      this.isActive = false;
    },
  },
  watch: {
    inputTextValue(newValue) {
      if (newValue.length > 0) {
        this.isMissingInput = false;
      } else this.isMissingInput = true;
    },
    missingInput(newValue) {
      if (newValue === true) {
        this.isMissingInput = true;
      }
    },
  },
  mounted() {
    const index = this.listOptions.findIndex(
      (option) => option == this.initValue
    );
    this.$refs.inputText.value = this.initValue;
    this.$emitter.on("clearComboboxValue", this.clearComboboxValue);
    this.$emitter.on("closeComboboxDropList", this.closeComboboxDropList);
  },
  beforeUnmount() {
    this.$emitter.off("clearComboboxValue");
    this.$emitter.off("closeComboboxDropList");
  },
};
</script>
<style scoped>
@import url(./mcombobox.css);
.active {
  background-color: #fff !important;
  border-color: #2ac012 !important;
}

.border-e61d1d {
  border-color: #e61d1d;
}
</style>
