using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain
{
    public interface IEmployeeValidate
    {
        /// <summary>
        /// Hàm kiểm tra nhân viên tồn tại theo Mã nhân viên (EmployeeCode)
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên (string)</param>
        /// <returns></returns>
        /// <exception cref="ConflictException"></exception>
        /// Created by: nkmdang (18/09/2023)
        Task CheckEmployeeExistAsync(string employeeCode);

        /// <summary>
        /// Hàm kiểm tra mã nhân viên mới nhập vào có trùng mã nhân viên của người khác không
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên (string)</param>
        /// <param name="employeeId">Định danh nhân viên (Guid)</param>
        /// <returns>true nếu trùng và false nếu không trùng</returns>
        /// Created by: nkmdang (19/09/2023)
        Task<bool> CheckDuplicateEmployeeCodeAsync(string employeeCode, Guid employeeId);

        /// <summary>
        /// Hàm kiểm tra thông tin nhân viên
        /// </summary>
        /// <param name="employee">Thông tin một nhân viên (Employee)</param>
        /// <returns>Thông báo những lỗi dữ liệu đầu vào</returns>
        /// Created by: nkmdang (18/09/2023)
        Task CheckEmployeeInput(Employee employee);
    }
}
