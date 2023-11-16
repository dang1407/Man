using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain.UnitTests
{
    public class EmployeeRepositoryFake : IEmployeeRepository
    {
        public int TotalCall { get; set; } = 0;
        public Task<int> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteManyAsync(List<Employee> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Employee> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Employee> FindEmployeeByEmployeeCodeAsync(string employeeCode)
        {
            throw new NotImplementedException();
        }

        public Task<Employee> FindEmployeeByFullNameAsync(string employeeFullName)
        {
            throw new NotImplementedException();
        }

        public Task<List<Employee>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Employee> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Employee>> GetByListIdAsync(List<Guid> ids)
        {
            throw new NotImplementedException();
        }

        public Task<List<Employee>> GetEmployeesPaginationAsync(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNewEmployeeCodeAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> GetNumEmployeesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Employee> InsertAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Employee>> InsertManyAsync(List<Employee> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> IsExistEmployeeAsync(string employeeCode)
        {
            TotalCall++;
            return null;
        }

        public Task<Employee> UpdateAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        Task<List<Employee>> IEmployeeRepository.FindEmployeeByFullNameAsync(string employeeFullName)
        {
            throw new NotImplementedException();
        }
    }
}
