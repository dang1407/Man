using Dapper;
using MISA.WebFresher072023.MF1736.NKMDANG.Application;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using MISA.WebFresher072023.MF1736.NKMDANG.SQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Infrastructure
{
    public class DepartmentRepository : BaseRepository<Department> ,IDepartmentRepository
    {
        public DepartmentRepository(IUnitOfWork uow) : base(uow)
        {
        }

        /// <summary>
        /// Hàm lấy thông tin Department theo DepartmentName
        /// </summary>
        /// <param name="departmentName">Tên đơn vị (string)</param>
        /// <returns>Thông tin đơn vị (Department)</returns>
        /// Created by: nkmdang (21/09/2023)
        public async Task<Department> GetDepartmentByNameAsync(string departmentName)
        {
            string sql = DepartmentSQL.GetDepartmentByNameSQL(departmentName);

            var result = await Uow.Connection.QueryFirstOrDefaultAsync<Department>(sql); 
            
            return result;  
        }
    }
}
