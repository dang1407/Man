<template>
  <div class="page__index">
    <div
      class="page__button--prev"
      :class="{ 'page__button--blur': pageSelected == 1 }"
      @click="onPrevPage"
    >
      <span>Trước</span>
    </div>
    <div class="flex" v-for="(page, index) in countPages" :key="index">
      <div
        v-if="page != '...'"
        class="pagination-item"
        :class="{ 'page--selected': pageSelected == page }"
        @click="onChangePage(page)"
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
          pageSelected == countPages[countPages?.length - 1],
      }"
      @click="onNextPage"
    >
      <span>Sau</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countPages: 0,
    pageSelected: 0,
  },
  methods: {
    onChangePage(page) {
      this.$emit("onChangePage", page);
    },
    onPrevPage() {
      if (parseInt(this.pageSelected) >= 2)
        this.$emit("onChangePage", parseInt(this.pageSelected) - 1);
    },
    onNextPage() {
      if (
        parseInt(this.pageSelected) <
        this.countPages[this.countPages?.length - 1]
      ) {
        this.$emit("onChangePage", parseInt(this.pageSelected) + 1);
      }
    },
  },
};
</script>
<style>
.page__index {
  display: flex;
  margin-right: 16px;
}

.page__button--prev {
  margin-right: 8px;
  cursor: pointer;
}

.page__button--blur {
  opacity: 0.4;
  pointer-events: none;
}

.pagination-item {
  padding: 0 6.5px;
  margin: 0 4px;
  cursor: pointer;
}

.page--selected {
  border: 1px solid #e0e0e0;
  font-weight: bold;
}

.page__button--next {
  margin-left: 8px;
  cursor: pointer;
}
</style>
