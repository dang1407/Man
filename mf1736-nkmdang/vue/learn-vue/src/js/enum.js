const baseEnum = {
  Gender: {
    VN: {
      0: "Nữ",
      1: "Nam",
      2: "Khác",
    },
    EN: {
      0: "Female",
      1: "Male",
      2: "Other",
    },
  },
  DeleteType: {
    DeleteOne: 30,
    DeleteMany: 31,
  },

  EmployeeDetailFormMode: {
    AddOne: 0,
    AddAndAddNew: 1,
    ChangeOne: 10,
    ChangeOneAndAddNew: 11,
    ReplicationOne: 20,
    ReplicationAndAddOne: 21,
    CancelClose: 31, // Đóng form chi tiết bằng nút hủy trên dialog
    NotClose: 32, // Đóng form chi tiết bằng nút không trên dialog
    YesClose: 33, // Đóng form chi tiết bằng nút có
  },
  PopUpType: {
    NotificationDialog: 0,
    AcceptDialog: 1,
    OptionDialog: 2,
    ToastMessage: 10,
  },
};

export default baseEnum;
