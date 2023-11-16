using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    public interface IEmployeeService
    {
        #region GET
        Task<List<EmployeeDTO>> GetAllEmployeesAsync();
        Task<EmployeeDTO> GetEmployeeByIdAsync(Guid employeeId);

        /// <summary>
        /// Hàm lấy thông tin nhân viên theo phân trang
        /// </summary>
        /// <param name="page">Số thứ tự trang, bắt đầu từ 1</param>
        /// <param name="pageSize">Số bản ghi mỗi trang</param>
        /// <returns>Thông tin nhân viên theo trang</returns>
        /// Created by: nkmdang (18/09/2023)
        Task<List<EmployeeDTO>> GetEmployeesByPaginationAsync(int page, int pageSize);  
        #endregion
        Task<EmployeeDTO> InsertEmployeeAsync(EmployeeCreateDTO employeeCreateDTO);

        Task<EmployeeDTO> UpdateEmployeeAsync(EmployeeUpdateDTO employeeUpdateDTO);

        Task<int> DeleteEmployeeByIdAsync(Guid employeeId);
        Task<int> DeleteMultipleEmployeesAsync();

        
    }
}
