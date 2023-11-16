const employeeResource = {
  VN: {
    // Các mã lỗi
    EmployeeCodeNotEmpty: "Mã nhân viên không được để trống.",
    EmployeeCodeNotValid:
      "Mã nhân viên phải có định dạng NV-00abcd trong đó a, b, c, d là các chữ số.",
    FullNameNotEmpty: "Họ tên không được để trống.",
    FullNameNotTooLong: "Họ tên không được quá 100 kí tự.",
    DepartmentNameNotEmpty: "Đơn vị không được để trống.",
    DeparmentNameNotExist:
      "Bạn hãy chọn một trong các đơn vị hiện có trong danh sách.",
    DateOfBirthNotInFuture: "Ngày sinh không được vượt quá ngày hiện tại.",
    DateOfBirthNotValid:
      "Ngày sinh của nhân viên phải thỏa mãn độ tuổi lao động từ 18 đến 70 tuổi.",
    PersonalIdentificationNotValid:
      "Số CMND chỉ bao gồm các số. Vui lòng kiểm tra lại nhé.",
    PICreatedDateNotInFuture:
      "Ngày cấp số CMND không được vượt quá ngày hiện tại.",
    PhoneNumberNotValid: (typePhoneNumber) =>
      `${typePhoneNumber} chưa đúng định dạng.`,

    FieldNotTooLong: (fieldName) =>
      `${fieldName} không thể quá 255 kí tự. Vui lòng kiểm tra lại nhé.`,
    EmailNotValid: "Email của bạn chưa đúng định dạng email.",
  },
  EN: {
    EmployeeCodeNotEmpty: "Employee code cannot be empty.",
    EmployeeCodeNotValid:
      "The employee code must be in the format NV-00abcd where a, b, c, d are digits.",
    FullNameNotEmpty: "Full name cannot be empty.",
    FullNameNotTooLong: "Full name cannot exceed 100 characters.",
    DepartmentNameNotEmpty: "Department cannot be empty.",
    DeparmentNameNotExist:
      "Please select one of the available units in the list.",
    DateOfBirthNotInFuture: "Date of birth cannot exceed the current date.",
    DateOfBirthNotValid:
      "The employee's date of birth must satisfy the working age range from 18 to 70 years old.",
    PICreatedDateNotInFuture:
      "The ID card number issuance date cannot exceed the current date.",
    PhoneNumberNotValid: (typePhoneNumber) =>
      `${typePhoneNumber} is not in the correct format.`,
    EmailNotValid: "Your email is not in the correct email format.",
  },
};

export default employeeResource;
