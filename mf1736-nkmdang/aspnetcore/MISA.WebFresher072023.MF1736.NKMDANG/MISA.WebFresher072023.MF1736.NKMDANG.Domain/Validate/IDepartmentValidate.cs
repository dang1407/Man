﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain
{
    public interface IDepartmentValidate
    {
        /// <summary>
        /// Hàm kiểm tra có tồn tại đơn vị theo tên người dùng nhập không
        /// </summary>
        /// <param name="departmentName">Tên đơn vị (string)</param>
        /// <returns>true nếu có, false nếu không có</returns>
        /// Created by: nkmdang (19/09/2023)
        Task CheckExistDepartmentByDepartmentNameAsync(string departmentName);
    }
}
