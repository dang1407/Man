const empData = [
  {
    empCode: "NV1",
    empName: "Name1",
    empBirthDay: "01/01/2002",
    empCCCD: "xxxxxxxxxxxx",
    empTitle: "Nhân viên kỹ thuật",
    empUnitName: "Khối sản xuất",
    empAccountNumber: "acc1",
    empBankName: "ACB",
    empBranchName: "Hà Nội",
  },
  {
    empCode: "NV2",
    empName: "Name2",
    empBirthDay: "02/02/2003",
    empCCCD: "yyyyyyyyyyyy",
    empTitle: "Nhân viên kinh doanh",
    empUnitName: "Khối tiếp thị",
    empAccountNumber: "acc2",
    empBankName: "Vietcombank",
    empBranchName: "Hồ Chí Minh",
  },
  {
    empCode: "NV3",
    empName: "Name3",
    empBirthDay: "03/03/2004",
    empCCCD: "zzzzzzzzzzzz",
    empTitle: "Quản lý nhân sự",
    empUnitName: "Khối quản lý",
    empAccountNumber: "acc3",
    empBankName: "BIDV",
    empBranchName: "Đà Nẵng",
  },
  {
    empCode: "NV4",
    empName: "Name4",
    empBirthDay: "04/04/2005",
    empCCCD: "wwwwwwwwwwww",
    empTitle: "Nhân viên sản xuất",
    empUnitName: "Khối sản xuất",
    empAccountNumber: "acc4",
    empBankName: "Techcombank",
    empBranchName: "Hải Phòng",
  },
  {
    empCode: "NV5",
    empName: "Name5",
    empBirthDay: "05/05/2006",
    empCCCD: "vvvvvvvvvvvv",
    empTitle: "Nhân viên tài chính",
    empUnitName: "Khối tài chính",
    empAccountNumber: "acc5",
    empBankName: "VietinBank",
    empBranchName: "Huế",
  },
  {
    empCode: "NV6",
    empName: "Name6",
    empBirthDay: "06/06/2007",
    empCCCD: "uuuuuuuuuuuu",
    empTitle: "Nhân viên marketing",
    empUnitName: "Khối marketing",
    empAccountNumber: "acc6",
    empBankName: "MBBank",
    empBranchName: "Cần Thơ",
  },
  {
    empCode: "NV7",
    empName: "Name7",
    empBirthDay: "07/07/2008",
    empCCCD: "tttttttttttt",
    empTitle: "Nhân viên IT",
    empUnitName: "Khối công nghệ",
    empAccountNumber: "acc7",
    empBankName: "VPBank",
    empBranchName: "Nha Trang",
  },
  {
    empCode: "NV8",
    empName: "Name8",
    empBirthDay: "08/08/2009",
    empCCCD: "ssssssssssss",
    empTitle: "Nhân viên hành chính",
    empUnitName: "Khối hành chính",
    empAccountNumber: "acc8",
    empBankName: "Agribank",
    empBranchName: "Vũng Tàu",
  },
  {
    empCode: "NV9",
    empName: "Name9",
    empBirthDay: "09/09/2010",
    empCCCD: "rrrrrrrrrrrr",
    empTitle: "Nhân viên bán hàng",
    empUnitName: "Khối bán hàng",
    empAccountNumber: "acc9",
    empBankName: "DongA Bank",
    empBranchName: "Quy Nhơn",
  },
  {
    empCode: "NV10",
    empName: "Name10",
    empBirthDay: "10/10/2011",
    empCCCD: "pppppppppppp",
    empTitle: "Nhân viên dịch vụ khách hàng",
    empUnitName: "Khối dịch vụ",
    empAccountNumber: "acc10",
    empBankName: "Sacombank",
    empBranchName: "Long Xuyên",
  },
];

// Chuyển ký tự $ sang jq trong Jquery
const jq = $.noConflict();

/**
 * Author: Minh Đăng
 * Feat: Điền thông tin text vào 1 ô td của bảng 15/8/2023
 */
function generateTableData(empInf) {
  let td = document.createElement("td");
  td.innerText = empInf;
  return td;
}

/**
 * Author: Minh Đăng
 * Feat: Tạo thẻ td với input ở cột đầu tiên của bảng 15/8/2023
 */

function generateInputCheckbox() {
  let td = document.createElement("td");
  let input = document.createElement("input");
  input.className = "emp-checkbox";
  input.type = "checkbox";
  td.appendChild(input);
  return td;
}

/**
 * Author: Minh Đăng
 * Feat: Tạo html phần sửa thông tin nhân viên 15/8/2023
 */
function generateTdChange() {
  return '<div class="emp-func-container flex-center"><div class="emp-change">Sửa</div><div class="emp-select-func flex-center"><div class="icons icon-angle-down"></div><div class="emp-drop-list"><div class="emp-drop-item"><a href="">Nhân bản</a></div><div class="emp-drop-item delete-emp" ><a href="">Xóa</a></div><div class="emp-drop-item"><a href="">Ngừng sử dụng</a></div></div></div></div>';
}
/**
 * Author: Minh Đăng
 * Feat: Tạo ra một hàng của bảng 15/8/2023
 *
 */
function generteTableRow(index) {
  if (0 <= index && index < empData.length) {
    let tr = document.createElement("tr");
    let tdChange = document.createElement("td");
    tdChange.innerHTML = generateTdChange();
    // let empTableDatas = [];
    tr.className = "emp-tr";
    tr.appendChild(generateInputCheckbox());
    for (let emp in empData[index]) {
      let newTd = generateTableData(empData[index][emp]);
      tr.appendChild(newTd);
    }
    tr.appendChild(tdChange);
    tr.setAttribute("index", index);
    return tr;
  }
}
/**
 * Author: Minh Đăng
 * feat: Đưa các dữ liệu giả vào bảng 15/8/2023
 */
function showEmpDataTable() {
  let empTbody = document.getElementsByClassName("emp-tbody")[0];
  // let totalRecord = 0;
  for (let index in empData) {
    // totalRecord++;
    let empTr = generteTableRow(index);
    empTbody.appendChild(empTr);
  }

  // document.getElementsByClassName(
  //   "emp-total"
  // )[0].innerText = `Tổng số bản ghi: ${empData.length}`;
}

showEmpDataTable();

/**
 * Author: Minh Đăng
 * Feat: Click icon cạnh nút Sửa trong bảng để mở ra dropdown list 15/8/2023
 */
jq(".emp-select-func").click(function (e) {
  e.stopPropagation();
  console.log("hello");
  jq(".emp-select-func").css("border", "1px solid #fff");
  jq(this).css("border", "1px solid #0075c0");
  // jq(this).children(".emp-drop-list").css("display", "block");
  jq(this).children(".emp-drop-list").toggle();
});

/**
 * Author: Minh Đăng
 * Feat: Click ra nơi bất kì khác để tắt dropdown list 15/8/2023
 */
jq(document).on("click", "body", function () {
  jq(".emp-select-func").css("border", "1px solid #fff");
  jq(".emp-drop-list").css("display", "none");
});

/**
 * Author: Minh Đăng
 * Feat: Xóa thông tin 1 nhân viên, cập nhật số bản ghi 15/8/2023
 */
jq(".delete-emp").click(function () {
  jq(this).parents(".emp-tr").hide();
  let numsEmp = document.getElementsByClassName("emp-nums")[0].innerText;
  numsEmp = numsEmp - 1;
  document.getElementsByClassName("emp-nums")[0].innerText = numsEmp;
});

/**
 * Author: Minh Đăng
 * Feat: Tìm kiếm nhân viên 15/8/2023
 */
jq(document).on("click", "#search-emp-btn", function () {
  let value = document.getElementById("search-emp-input").value;
  console.log(value);
  document.getElementsByClassName("emp-tbody")[0].innerHTML = "";
  let numResult = 0;
  for (let empKey in empData) {
    for (let key in empData[empKey]) {
      if (empData[empKey][key] === value) {
        document
          .getElementsByClassName("emp-tbody")[0]
          .appendChild(generteTableRow(empKey));
        numResult++;
        // return;
      }
    }
  }
  document.getElementsByClassName("emp-nums")[0].innerText = numResult;
});

/**
 * Author: Minh Đăng
 * Feat: Load lại bảng theo dữ liệu ban đầu 15/8/2023
 */
jq(".icon-reload").click(function () {
  let tbody = document.getElementsByClassName("emp-tbody")[0];
  tbody.innerHTML = "";
  showEmpDataTable();
  let numEmps = document.getElementsByClassName("emp-nums")[0];
  numEmps.innerText = empData.length;
});

/**
 * Author: Minh Đăng
 * Feat: Đổi trang thông tin trong bảng nhân viên, tô đậm và tô border 15/8/2023
 */
jq(".num-page-item").click(function () {
  jq(".num-page-item").css("border", "1px solid #fff");
  jq(".num-page-item").css("font-weight", "normal");
  jq(this).css("border", "1px solid #e0e0e0");
  jq(this).css("font-weight", "bold");
});

/**
 * Author: Minh Đăng
 * Feat: Mở lựa chọn số bản ghi trong trang 15/8/2023
 */
jq(".emps-box-icon").click(function () {
  jq(".emp-dropup-list").toggle();
  jq(".emps-per-page-icon").toggleClass("rotate-180");
  // jq(".emp-border-icon").css("rotate", "180deg");
});

/**
 * Author: Minh Đăng
 * Feat: Double click vào 1 hàng để mở form chi tiết trong bảng 15/8/2023
 */
jq(".emp-tr").dblclick(function () {
  jq(".emp-form-title").text("Thông tin nhân viên");
  jq(".emp-detail-container").css("display", "flex");
});

/**
 * Author: Minh Đăng
 * Feat: Chỉnh màu border icon 15/8/2023
 */
jq(".emp-tr").mouseenter(function () {
  jq(this).find(".emp-select-func").css("border", "1px solid #fff8cb");
});

jq(".emp-tr").click(function (e) {
  e.stopPropagation();
  jq(this).find(".emp-select-func").css("border", "1px solid #fff8cb");
});

jq(".emp-tr").mouseleave(function () {
  jq(this).find(".emp-select-func").css("border", "1px solid #ffffff");
});

/**
 * Author: Minh Đăng
 * Feat: Click icon đóng form chi tiết 15/8/2023
 */
jq(".emp-detail-close").click(function () {
  jq(".emp-detail-container").css("display", "none");
});

/**
 * Author: Minh Đăng
 * Feat: Click check ô ở checkbox giới tính 15/8/2023
 */
jq(".radio-input-box").click(function () {
  jq(".radio-box").css("border-color", "#ccc");
  jq(".radio-box").css("box-shadow", "none");
  jq(".radio-body").css("background-color", "#fff");
  jq(this).children(".radio-input").checked = true;
  // var radioInput = jq(this).find(".radio-input");

  // // Đảo ngược trạng thái checked
  // radioInput.prop("checked", !radioInput.prop("checked"));
  jq(this).siblings(".radio-box").css("border-color", "#2ca012");
  jq(this).siblings(".radio-box").css("box-shadow", "0 0 5px #2ca012");
  jq(this)
    .siblings(".radio-box")
    .children(".radio-body")
    .css("background-color", "#2ca012");
});

/**
 * Author: Minh Đăng
 * Feat: Mở form thêm mới nhân viên 15/8/2023
 */
jq(".add-new-emp").click(function () {
  jq(".emp-detail-container").css("display", "flex");
  jq(".emp-form-title").text("Thêm mới nhân viên");
});

/**
 * Author: Minh Đăng
 * Feat: Bấm phím ESC đóng form chi tiết 15/8/2023
 */
jq(window).on("keydown", function (e) {
  console.log("helllo");
  if (e.key === "Escape" || e.key === "Esc")
    jq(".emp-detail-container").css("display", "none");
});

/**
 * Author: Minh Đăng
 * Feat: Click Cất thông tin 15/8/2023
 */
jq(".save").click(function () {
  alert("Cất");
});

jq(document).on("keydown", function (e) {
  if (e.ctrlKey && (e.key === "s" || e.key === "S") && !e.shiftKey) {
    alert("Cất");
  }
});

jq(".create").click(function () {
  alert("Cất và thêm");
});

jq(document).on("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
    alert("Cất và thêm");
  }
});
