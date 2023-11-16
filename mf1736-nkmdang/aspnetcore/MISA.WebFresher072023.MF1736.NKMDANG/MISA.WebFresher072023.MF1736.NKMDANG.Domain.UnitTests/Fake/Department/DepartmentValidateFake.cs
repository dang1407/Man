using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain.UnitTests { 
    public class DepartmentValidateFake : IDepartmentValidate
    {
        public int TotalCall { get; set; } = 0;
        public Task CheckExistDepartmentByDepartmentNameAsync(string departmentName)
        {
            TotalCall++;
            return Task.FromResult(false);
        }
    }
}
