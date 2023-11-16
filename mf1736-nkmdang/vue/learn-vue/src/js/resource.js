// const resource = {
//   VN: {
//     EmployeeCodeNotEmpty: "Mã nhân viên không được phép để trống!",
//     EmployeeNameNotEmpty: "Tên nhân viên không được phép để trống!",
//     EmployeeUnitNotEmpty: "Đơn vị không được phép để trống!",
//     DeleteEmployeeTitle: "Xóa những nhân viên đã chọn?",
//     DeleteEmployeeDesc:
//       "Thao tác xóa thông tin nhân viên sẽ không thể khôi phục.",
//     DeleteEmployeeCancel: "Hủy",
//     DeleteEmployeeAccept: "Đồng ý",
//     ToastMesContent: {
//       Success: {
//         Status: "Thành công!",
//         Desc: "Yêu cầu đã được thực hiện",
//         TextClass: "text-50b83c",
//         OptionAction: "Hoàn tác",
//         Icon: "icon__success",
//       },
//       Error: {
//         Status: "Lỗi!",
//         Desc: "Có lỗi xảy ra",
//         TextClass: "text-DE3618",
//         OptionAction: "Xem hướng dẫn",
//         Icon: "icon__error",
//       },
//     },
//     DialogContent: {
//       CustomerForm: {
//         ErrorInput: {
//           MissingRequiredField: {
//             Title: "Thiếu trường bắt buộc",
//             Icon: "icon__bigwarning",
//             Message: "Bạn chưa nhập đầy đủ các trường bắt buộc có dấu sao đỏ!",
//           },
//           InvalidField: {
//             Title: "Thông tin đã nhập không hợp lệ",
//             Icon: "icon__bigwarning",
//             Message: "",
//           },
//         },
//         DeleteError: {
//           Title: "Lỗi",
//           Icon: "icon__bigwarning",
//           Message: "Có lỗi khi thực hiện xóa nhân viên.",
//         },
//       },
//       EmployeeForm: {
//         ErrorInput: {
//           MissingRequiredField: {
//             Title: "Thiếu trường bắt buộc",
//             Icon: "icon__bigwarning",
//             Message: "Bạn chưa nhập đầy đủ các trường bắt buộc có dấu sao đỏ!",
//           },
//           InvalidField: {
//             Title: "Thông tin đã nhập không hợp lệ",
//             Icon: "icon__bigwarning",
//             Message: "",
//           },
//         },
//         DeleteError: {
//           Title: "Lỗi",
//           Icon: "icon__bigwarning",
//           Message: "Có lỗi khi thực hiện xóa nhân viên.",
//         },
//       },
//     },
//     Cancel: "Hủy",
//     Accept: "Đồng ý",
//   },
//   EN: {
//     EmployeeCodeNotEmpty: "Employee's code is not empty!",
//     EmployeeNameNotEmpty: "Employee's name is not empty!",
//     EmployeeUnitNotEmpty: "Employee's unit is not empty!",
//     DeleteEmployeeTitle: "Delete all selected employees?",
//     DeleteEmployeeDesc: "This behavior is not reverse.",
//     DeleteEmployeeCancel: "Cancel",
//     DeleteEmployeeAccept: "Accept",
//     ToastMesContent: {
//       Success: {
//         Status: "Success!",
//         Desc: "Request has been done",
//         TextClass: "text-50b83c",
//         OptionAction: "Undo",
//         Icon: "icon__success",
//       },
//       Error: {
//         Status: "Error!",
//         Desc: "Error has been occur",
//         TextClass: "text-DE3618",
//         OptionAction: "View guide",
//         Icon: "icon__error",
//       },
//     },
//     DialogContent: {
//       CustomerForm: {
//         ErrorInput: {
//           MissingRequiredField: {
//             Title: "Missing required fields!",
//             Icon: "icon__bigwarning",
//             Message:
//               "You have not filled in all required fields marked with a red asterisk!",
//           },
//           InvalidField: {
//             Title: "Invalid information entered",
//             Icon: "icon__bigwarning",
//             Message: "",
//           },
//         },
//         NotFound: {
//           Title: "Lỗi",
//           Icon: "icon__bigwarning",
//           Message: "Vui lòng liên hệ MISA để biết thêm chi tiết.",
//         },
//       },
//       EmployeeForm: {
//         ErrorInput: {
//           MissingRequiredField: {
//             Title: "Missing required fields!",
//             Icon: "icon__bigwarning",
//             Message:
//               "You have not filled in all required fields marked with a red asterisk!",
//           },
//           InvalidField: {
//             Title: "Invalid information entered",
//             Icon: "icon__bigwarning",
//             Message: "",
//           },
//         },
//         NotFound: {
//           Title: "Error",
//           Icon: "icon__bigwarning",
//           Message: "Please contact MISA to get more information.",
//         },
//       },
//     },
//     Cancel: "Cancel",
//     Accept: "Accept",
//   },
// };

const resource = {
  VN: {
    Accept: "Đồng ý",
    Cancel: "Hủy",
    Not: "Không",
    DialogContent: {
      MissingInput: {
        Title: "Thiếu trường bắt buộc",
        Icon: "icon__bigwarning",
        Message: "Bạn chưa nhập đầy đủ các trường bắt buộc.",
      },
      Error: {
        Title: "Lỗi",
        Icon: "icon--error",
        Message: "Có lỗi xảy ra! Vui lòng liên hệ chúng tôi để được hỗ trợ.",
      },
      ConfirmDeleteManyEmployees: {
        Title: "Xóa các nhân viên đã chọn",
        Icon: "icon--confirm",
        Message: "Bạn có chắc chắn muốn xóa tất cả nhân viên đã chọn không?",
      },
      ConfirmDeleteOneEmployee: {
        Title: "Xóa nhân viên đã chọn",
        Icon: "icon--confirm",
        Message: "Bạn có chắc chắn muốn xóa nhân viên này không?",
      },
      ConfirmAddNewEmployee: {
        Title: "Thêm mới nhân viên",
        Icon: "icon--confirm",
        Message: "Bạn có chắc chắn muốn thêm mới nhân viên này không?",
      },
      ConfirmCloseEmployeeForm: {
        Title: "Dữ liệu đã thay đổi",
        Icon: "icon--confirm",
        Message: "Dữ liệu đã thay đổi. Bạn có muốn cất không?",
      },
      NotValidInputForm: {
        Title: "Nhập liệu chưa đúng thông tin",
        Icon: "icon__bigwarning",
        Message:
          "Trường thông tin bạn nhập bị trống hoặc chưa đúng định dạng. Vui lòng kiểm tra lại nhé.",
      },
      EmployeeForm: {},
    },
    ToastMessageContent: {
      EmployeeForm: {
        AddSuccess: {
          Status: "Thành công!",
          Desc: "Thêm mới nhân viên thành công.",
          TextClass: "text-50b83c",
          OptionAction: "Hoàn tác",
          Icon: "icon__success",
        },
        UpdateSuccess: {
          Status: "Thành công!",
          Desc: "Sửa thông tin nhân viên thành công.",
          TextClass: "text-50b83c",
          OptionAction: "Hoàn tác",
          Icon: "icon__success",
        },
        DeleteSuccess: {
          Status: "Thành công!",
          Desc: "Xóa nhân viên thành công.",
          TextClass: "text-50b83c",
          OptionAction: "Hoàn tác",
          Icon: "icon__success",
        },
        DeleteManySuccess: {
          Status: "Thành công!",
          Desc: "Xóa các nhân viên đã chọn thành công.",
          TextClass: "text-50b83c",
          OptionAction: "Hoàn tác",
          Icon: "icon__success",
        },
        CannotGetNewEmployeeCode: {
          Status: "Lỗi!",
          Desc: "Không thế lấy mã nhân viên mới.",
          TextClass: "text-F49342",
          OptionAction: "",
          Icon: "icon__warning",
        },
        CannotDeleteEmployee: {
          Status: "Lỗi!",
          Desc: "Không thế xóa nhân viên.",
          TextClass: "text-F49342",
          OptionAction: "",
          Icon: "icon__warning",
        },
        CannotGetEmployees: {
          Status: "Lỗi!",
          Desc: "Không thể lấy thông tin nhân viên. Vui lòng thử lại!",
          TextClass: "text-F49342",
          OptionAction: "",
          Icon: "icon__warning",
        },
        CannotGetDepartments: {
          Status: "Lỗi!",
          Desc: "Không thể lấy thông tin đơn vị. Vui lòng thử lại!",
          TextClass: "text-F49342",
          OptionAction: "",
          Icon: "icon__warning",
        },
      },
      CannotGetDateConfiguration: {
        Status: "Lỗi!",
        Desc: "Không thể lấy thông tin định dạng ngày tháng.",
        TextClass: "text-F49342",
        OptionAction: "",
        Icon: "icon__warning",
      },
      Error: {
        Status: "Lỗi!",
        Desc: "Có lỗi xảy ra.",
        TextClass: "text-F49342",
        OptionAction: "",
        Icon: "icon__warning",
      },
    },
    DatePickerOptions: {
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
  },
  EN: {
    Accept: "Accept",
    Cancel: "Cancel",
    Not: "Not",
    DialogContent: {
      Error: {
        Title: "Error",
        Icon: "",
        Message: "Some error occured! Please contact us to get help.",
      },
      MissingInput: {
        Title: "Missing required field",
        Icon: "icon__bigwarning",
        Message: "You hasnot been enterd all required field.",
      },
      ConfirmDeleteManyEmployees: {
        Title: "Delete all selected employees",
        Icon: "",
        Message: "Are you sure you want to delete all selected employees",
      },
      ConfirmDeleteOneEmployee: {
        Title: "Delete all selected employees",
        Icon: "",
        Message: "Are you sure you want to delete all selected employees",
      },
      EmployeeForm: {},
    },
    ToastMessageContent: {
      EmployeeForm: {
        AddSuccess: {
          Status: "Success!",
          Desc: "Add new employee successfully.",
          TextClass: "text-50b83c",
          OptionAction: "Undo",
          Icon: "icon__warning",
        },
        DeleteSuccess: {
          Status: "Success!",
          Desc: "Add new employee successfully.",
          TextClass: "text-50b83c",
          OptionAction: "Undo",
          Icon: "icon__warning",
        },
        CannotGetNewEmployeeCode: {
          Status: "Error!",
          Desc: "Cannot get new employee code.",
          TextClass: "text-F49342",
          OptionAction: "",
          Icon: "icon__warning",
        },
      },
    },
  },
};

export default resource;
