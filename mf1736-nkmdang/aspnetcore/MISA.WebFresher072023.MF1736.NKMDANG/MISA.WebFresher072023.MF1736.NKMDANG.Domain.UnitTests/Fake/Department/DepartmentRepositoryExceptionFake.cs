using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain.UnitTests
{
    public class DepartmentRepositoryExceptionFake : IDepartmentRepository
    {
        public int TotalCall { get; set; } = 0;
        public Task<int> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteManyAsync(List<Department> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Department> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Department>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Department> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Department>> GetByListIdAsync(List<Guid> ids)
        {
            throw new NotImplementedException();
        }


        public async Task<Department> GetDepartmentByNameAsync(string departmentName)
        {
            TotalCall++;
            throw new NotFoundException(DepartmentUserMessageResource.DepartmentNotFound, DepartmentUserMessageResource.DepartmentNotFound, 404);
        }

        public Task<Department> InsertAsync(Department entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Department>> InsertManyAsync(List<Department> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Department> UpdateAsync(Department entity)
        {
            throw new NotImplementedException();
        }
    }
}
