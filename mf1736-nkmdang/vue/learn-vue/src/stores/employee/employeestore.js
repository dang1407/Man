import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    products: [],
  }),
  getters: {
    employeeCount,
  },
});
