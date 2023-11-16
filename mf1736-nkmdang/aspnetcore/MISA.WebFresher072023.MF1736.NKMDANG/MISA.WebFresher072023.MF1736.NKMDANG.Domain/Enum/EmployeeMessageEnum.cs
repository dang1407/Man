namespace MISA.WebFresher072023.MF1736.NKMDANG
{
    public class EmployeeMessageEnum
    {
        #region User Message
        public static readonly string EmployeeNotFound = "Không tìm thấy nhân viên.";
        public static readonly string CannotCreateNewEmployee = "Không thể thêm mới nhân viên.";
        public static readonly string CreateNewEmployeeSuccess = "Thêm mới nhân viên thành công.";
        public static readonly string UpdateEmployeeSuccess = "Thay đổi thông tin nhân viên thành công.";
        public static readonly string DeleteEmployeeSuccess = "Xóa nhân viên thành công.";
        public static readonly string CannotGetEmployees = "Không thể lấy được thông tin nhân viên.";
        public static readonly string EmployeeCodeExist = "Mã nhân viên đã tồn tại! Vui lòng nhập mã nhân viên khác.";

        #endregion

        #region Dev Message
        public static string EmployeeNotFoundDevMessage = "Không thể tìm thấy nhân viên theo EmployeeCode hoặc EmployeeId";
        #endregion

        #region ErrorCode
        public static int EmployeeCodeNotExistErrorCode = 404;    
        public static int EmployeeCodeExisErrorCode = 409;
        #endregion
    }
}
