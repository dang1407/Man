using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain
{
    public class DepartmentValidate : IDepartmentValidate
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentValidate(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        /// <summary>
        /// Hàm kiểm tra có tồn tại đơn vị theo tên người dùng nhập không
        /// </summary>
        /// <param name="departmentName">Tên đơn vị (string)</param>
        /// <returns>true nếu có, false nếu không có</returns>
        /// Created by: nkmdang (19/09/2023)
        public async Task CheckExistDepartmentByDepartmentNameAsync(string departmentName)
        {
            var existDepartment = await _departmentRepository.GetDepartmentByNameAsync(departmentName);
            if(existDepartment == null) 
            {
                throw new NotFoundException(DepartmentUserMessageResource.DepartmentNotFound, DepartmentUserMessageResource.DepartmentNotFound, 404);
            }
        }
    }
}
