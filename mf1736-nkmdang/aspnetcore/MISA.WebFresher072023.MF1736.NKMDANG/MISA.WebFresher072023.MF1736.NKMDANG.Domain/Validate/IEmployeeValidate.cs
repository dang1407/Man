﻿using System;
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
        /// <exception cref="ConflictException">Nếu tồn tại</exception>
        /// Created by: nkmdang (18/09/2023)
        Task CheckEmployeeExistAsync(Employee employee );

        /// <summary>
        /// Hàm kiểm tra mã nhân viên mới nhập vào có trùng mã nhân viên của người khác không
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên (string)</param>
        /// <param name="employeeId">Định danh nhân viên (Guid)</param>
        /// <returns>true nếu trùng và false nếu không trùng</returns>
        /// Created by: nkmdang (19/09/2023)
        Task CheckDuplicateEmployeeCodeAsync(string employeeCode, Guid employeeId);



        /// <summary>
        /// Hàm kiểm tra tên đơn vị có tồn tại hay không
        /// </summary>
        /// <param name="employee">Thông tin nhân viên</param>
        /// <returns>Mã lỗi nếu không thấy</returns>
        /// Created by: nkmdang (21/09/2023)
        Task CheckDepartmentNameAsync(Employee employee);
    }
}
