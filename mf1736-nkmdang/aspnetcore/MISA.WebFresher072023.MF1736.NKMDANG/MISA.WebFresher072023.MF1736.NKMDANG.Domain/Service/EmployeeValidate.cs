using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain
{
    /// <summary>
    /// Class validate nghiệp vụ cho dữ liệu của Employee
    /// </summary>
    public class EmployeeValidate : IEmployeeValidate
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeValidate(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }   


        /// <summary>
        /// Hàm kiểm tra nhân viên tồn tại theo Mã nhân viên (EmployeeCode)
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên (string)</param>
        /// <returns></returns>
        /// <exception cref="ConflictException"></exception>
        /// Created by: nkmdang (18/09/2023)
        public async Task CheckEmployeeExistAsync(string employeeCode)
        {
            var isExistEmployee = await _employeeRepository.IsExistEmployeeAsync(employeeCode); 
            if (isExistEmployee != null) 
            {
                throw new ConflictException(EmployeeMessageEnum.EmployeeCodeExist);
            }
            
        }


        /// <summary>
        /// Hàm kiểm tra thông tin nhân viên
        /// </summary>
        /// <param name="employee">Thông tin một nhân viên (Employee)</param>
        /// <returns>Thông báo những lỗi dữ liệu đầu vào</returns>
        /// Created by: nkmdang (18/09/2023)
        public Task CheckEmployeeInput(Employee employee)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CheckDuplicateEmployeeCodeAsync(string employeeCode, Guid employeeId) 
        {
            var anotherEmployee = await _employeeRepository.FindEmployeeByEmployeeCodeAsync(employeeCode);

            if(anotherEmployee != null) 
            {
                if(anotherEmployee.EmployeeId != employeeId)
                {
                    return true;
                } 
                else
                {
                    return false;
                }
            } else return false;
        }
    }
}
