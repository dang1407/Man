<template>
  <div class="minput-checkbox-container">
    <div class="checkbox-pseudobox">
      <div class="icons tickv-circle"></div>
    </div>
    <div class="checkbox-box">
      <input type="checkbox" :checked="checked" :value="value" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["checked", "value"],
};
</script>
<style>
:root {
  --width-minput-checkbox: 20px;
}

.minput-checkbox-container {
  width: var(--width-minput-checkbox);
  height: var(--width-minput-checkbox);
}

.checkbox-pseudobox {
  width: var(--width-minput-checkbox);
  height: var(--width-minput-checkbox);
  background-color: #2ca012;
  border-radius: 4px;
  fill: #2ca012;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-box {
  margin-top: -20px;
}

.checkbox-box input[type="checkbox"] {
  display: inline-block;
  width: var(--width-minput-checkbox);
  height: var(--width-minput-checkbox);
  cursor: pointer;
}

.checkbox-box input[type="checkbox"]:checked {
  opacity: 0;
}

.tickv-circle {
  background-position: -1602px -258px;
  width: 20px;
  height: 20px;
}
.ti-minus {
  width: 13px;
  height: 2px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
