const helper = {
  /**
   * Author: Minh Đăng 27/08/2023
   * Feat: Định dạng lại ngày tháng năm từ datetime sang dd/mm/yyyy
   * @param {*} date
   * @returns
   */
  formatDate(date) {
    if (!date || date == "0001-01-01T00:00:00") {
      return "";
    }
    const dateUTC = new Date(date);
    if (isNaN(dateUTC.getDate())) {
      return "";
    }
    let day = dateUTC.getDate();
    let month = dateUTC.getMonth() + 1;
    let year = dateUTC.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${day}/${month}/${year}`;
  },

  isValidDate(dateStr) {
    // Kiểm tra xem định dạng ngày là dd/mm/yyyy
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Kiểm tra định dạng chuỗi ngày
    if (!datePattern.test(dateStr)) {
      return false; // Định dạng không đúng
    }

    // Tách ngày, tháng và năm từ chuỗi
    const [, day, month, year] = dateStr.match(datePattern);

    // Chuyển đổi thành số nguyên
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    // Kiểm tra xem ngày, tháng và năm có hợp lệ hay không
    if (
      yearInt < 1000 ||
      yearInt > 9999 ||
      monthInt < 1 ||
      monthInt > 12 ||
      dayInt < 1 ||
      dayInt > 31
    ) {
      return false; // Ngày không hợp lệ
    }

    // Kiểm tra tháng 2 và số ngày trong tháng
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
    if (dayInt > daysInMonth) {
      return false; // Ngày không hợp lệ
    }

    return true; // Ngày hợp lệ
  },

  /**
   * Author: Minh Đăng 28/03/2023
   * Feat: Chuyển ngày dạng dd/mm/yyyy sang yyyy-mm-ddT00:00:00
   */
  convertDateToDateTime(date, timezone) {
    if (!date) return null;
    date = date.toString();
    let day = parseInt(date.slice(0, 2));
    let month = parseInt(date.slice(3, 5));
    let year = date.slice(6, 10);
    if (!day || !month || !year) {
      return null;
    }
    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }
    return `${year}-${month}-${day}T00:00:00`;
  },

  /**
   * Chuyển đổi định dạng ngày từ DB yyyy-mm-dd sang dd/mm/yyyy để hiện thị ở datepicker
   * @param {String} dateDB Chuỗi nhận từ CSDL có dạng yyyy-mm-dd
   * @returns Ngày định dạng dd/mm/yyyy
   * Created by: nkmdang (03/10/2023)
   */
  covertDateDBToDatePickerDate(dateDB) {
    const year = dateDB.substring(0, 4);
    const month = dateDB.substring(5, 7);
    const date = dateDB.substring(8, 10);
    return `${date}/${month}/${year}`;
  },
};

export default helper;
