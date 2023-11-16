import axios from "axios";
// class AxiosCustom {
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Viết lại phương thức axios.get
//    * @param {*} url // API cần get dữ liệu
//    * @param {*} errorHandler // callback xử lý lỗi
//    * @returns
//    */
//   async GET(url, errorHandler) {
//     try {
//       const respone = await axios.get(url);
//       return respone;
//     } catch (error) {
//       console.log(error);
//       errorHandler(error);
//       return error;
//     }
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Viết lại phương thức axios.post
//    * @param {*} url // API cần post dữ liệu
//    * @param {*} errorHandler // callback xử lý lỗi
//    * @param {*} beforeCallAPI // callback các thao tác cần thực hiện trước khi gọi API (kiểm tra đầu vào, hiển thị IsLoading,...), cần trả về true false
//    * @param {*} afterCallAPI // callback các thao tác cần thực hiện sau khi gọi API (đóng IsLoading, hiển thị ToastMessage,...)
//    * @returns
//    */
//   async POST(url, data, errorHandler, beforeCallAPI, afterCallAPI) {
//     console.log(url, data, errorHandler, beforeCallAPI, afterCallAPI);
//     try {
//       if (!beforeCallAPI()) {
//         return;
//       }
//       const respone = await axios.post(url, data);
//       afterCallAPI();
//       return respone;
//     } catch (error) {
//       errorHandler(error);
//     }
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Viết lại phương thức axios.get
//    * @param {*} url // API cần get dữ liệu
//    * @param {*} errorHandler // callback xử lý lỗi
//    * @returns
//    */
//   async DELETE(url, errorHandler) {
//     try {
//       const respone = await axios.delete(url);
//       return respone;
//     } catch (error) {
//       errorHandler(error);
//     }
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Phương thức axios.get bình thường
//    * @param {*} url
//    * @returns
//    */
//   async get(url) {
//     const respone = await axios.get(url);
//     return respone;
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Phương thức axios.post bình thường
//    * @param {*} url
//    * @returns
//    */
//   async post(url, data) {
//     const response = await axios.post(url, data);
//     return response;
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Phương thức axios.put bình thường
//    * @param {*} url
//    * @returns
//    */
//   async put(url, data) {
//     const respone = await axios.put(url, data);
//     return respone;
//   }
//   /**
//    * Author: Minh Đăng 31/08/2023
//    * Feat: Phương thức axios.delete bình thường
//    * @param {*} url
//    * @returns
//    */
//   async delete(url, data) {
//     const respone = await axios.delete(url, data);
//     return respone;
//   }
// }

const myAxios = axios.create({
  baseURL: "https://localhost:7214/api/v1",
});
export default myAxios;
