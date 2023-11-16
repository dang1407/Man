using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Domain.UnitTests
{
    [TestFixture]
    public class DepartmentValidateTests
    {

        /// <summary>
        /// Hàm test hàm CheckExistDepartmentByDepartmentNameAsync trong trường hợp lấy ra thành công đơn vị
        /// </summary>
        /// <returns></returns>
        /// Created by: nkmdang (25/09/2023)
        [Test]  
        public async Task CheckExistDepartmentByDepartmentNameAsync_ExistDepartment_Success()
        {
            // Arrange
            var department = new Department();  
            var departmentRepository = new DepartmentRepositoryFake();

            var departmentValidate = new DepartmentValidate(departmentRepository);

            // Act
            await departmentValidate.CheckExistDepartmentByDepartmentNameAsync(department.DepartmentName);

            // Assert 
            Assert.That(departmentRepository.TotalCall, Is.EqualTo(1));
        }

        /// <summary>
        /// Hàm test hàm CheckExistDepartmentByDepartmentNameAsync trong trường hợp không thấy và trả ra exception
        /// </summary>
        /// <returns></returns>
        /// Created by: nkmdang (25/09/2023)
        [Test]
        public void CheckExistDepartmentByDepartmentNameAsync_NotExistDepartment_ThrowException()
        {
            // Arrange
            var department = new Department();
            var departmentRepository = new DepartmentRepositoryExceptionFake();

            var departmentValidate = new DepartmentValidate(departmentRepository);

            // Act and Assert
            var exception = Assert.ThrowsAsync<NotFoundException>(async () => await departmentValidate.CheckExistDepartmentByDepartmentNameAsync(department.DepartmentName));

            Assert.Multiple(() =>
            {
                // Gọi departmentRepository 1 lần
                Assert.That(departmentRepository.TotalCall, Is.EqualTo(1));
                // Các mã lỗi phải chuẩn
                Assert.That(exception.DevMessage, Is.EqualTo(DepartmentUserMessageResource.DepartmentNotFound));
                Assert.That(exception.UserMessage, Is.EqualTo(DepartmentUserMessageResource.DepartmentNotFound));
                Assert.That(exception.ErrorCode, Is.EqualTo(404));
            });
        }
    }
}
