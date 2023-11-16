using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain.UnitTests
{
    public class EmployeeRepositoryFakeException : IEmployeeRepository
    {
        public int TotalCall { get; set; } = 0;
        public Task<int> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteManyAsync(List<Domain.Employee> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Domain.Employee> FindByIdAsync(Guid id)
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

        public Task<List<Domain.Employee>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Domain.Employee> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Domain.Employee>> GetByListIdAsync(List<Guid> ids)
        {
            throw new NotImplementedException();
        }

        public Task<List<Domain.Employee>> GetEmployeesPaginationAsync(int page, int pageSize)
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

        public Task<Domain.Employee> InsertAsync(Domain.Employee entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Domain.Employee>> InsertManyAsync(List<Domain.Employee> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> IsExistEmployeeAsync(string employeeCode)
        {
            TotalCall++;
            return Task.FromResult(true);   
        }

        public Task<Domain.Employee> UpdateAsync(Domain.Employee entity)
        {
            throw new NotImplementedException();
        }

        Task<List<Employee>> IEmployeeRepository.FindEmployeeByFullNameAsync(string employeeFullName)
        {
            throw new NotImplementedException();
        }
    }
}
