using Dapper;
using MISA.WebFresher072023.MF1736.NKMDANG.Application;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using MySqlConnector;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Infrastructure
{
    public class EmployeeRepository : BaseRepository<Employee> ,IEmployeeRepository
    {
        public EmployeeRepository(IUnitOfWork uow) : base(uow)
        {
        }

        public async override Task<Employee> GetByIdAsync(Guid id)
        {
            var entity = await FindByIdAsync(id);
            if (entity != null)
            {
                return entity;
            }
            else
            {
                throw new NotFoundException(EmployeeMessageResource.EmployeeNotFound, EmployeeMessageResource.EmployeeNotFound, 404);
            }
        }

        /// <summary>
        /// Hàm lấy thông tin nhân viên theo phân trang
        /// </summary>
        /// <param name="page">Số thứ tự trang, bắt đầu từ 1</param>
        /// <param name="pageSize">Số bản ghi mỗi trang</param>
        /// <returns>Thông tin nhân viên theo trang</returns>
        /// Created by: nkmdang (18/09/2023)
        public async Task<List<Employee>> GetEmployeesPaginationAsync(int page, int pageSize)
        {
            // Tạo câu lệnh sql
            string sql = EmployeeSQL.GetEmployeesPaginationSQL(page - 1, pageSize);

            // Thực thi truy vấn
            var result = await Uow.Connection.QueryAsync<Employee>(sql);

            return result.ToList();
        }


        

        /// <summary>
        /// Hàm lấy mã nhân viên mới
        /// </summary>
        /// <returns>Mã nhân viên mới (string)</returns>
        /// Created by: nkmdang (27/09/2023)
        public async Task<string> GetNewEmployeeCodeAsync()
        {
            // Tạo câu lệnh SQL
            string sql = "SELECT CONCAT('NV-00', LPAD(CAST(SUBSTRING(MAX(EmployeeCode), 4) AS UNSIGNED) + 1, 4, '0')) AS new_employee_code FROM employee;";

            // Thực hiện truy vấn
            var result = await Uow.Connection.QuerySingleOrDefaultAsync<string>(sql);
            return result;
        }


        /// <summary>
        /// Hàm kiểm tra nhân viên tồn tại bằng Mã nhân viên (EmployeeCode)
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên (string)</param>
        /// <returns>Thông tin nhân viên nếu tìm thấy, null nếu không tìm thấy</returns>
        /// Created by: nkmdang (18/09/2023)
        public async Task<dynamic> IsExistEmployeeAsync(string employeeCode)
        {
            // Tạo câu lệnh sql
            string sql = EmployeeSQL.GetEmployeeByEmployeeCodeSQL();

            // Tạo param 
            var param = new DynamicParameters();
            param.Add("EmployeeCode", employeeCode);
            var result = await Uow.Connection.QuerySingleOrDefaultAsync(sql, param);
            if (result != null) return true;
            else return false;
        }

        /// <summary>
        /// Hàm lấy ra số nhân viên trong database
        /// </summary>
        /// <returns>Số nhân viên hiện có trong database</returns>
        /// Created by: nkmdang (26/09/2023)
        public async Task<int> GetNumEmployeesAsync()
        {
            // Tạo câu lệnh SQL
            string sql = "SELECT COUNT(EmployeeId) FROM employee e";

            var resultDB = await Uow.Connection.QueryFirstOrDefaultAsync<int>(sql);
            return resultDB;
        }


        #region Chức năng tìm kiếm nhân viên
        /// <summary>
        /// Hàm tìm kiếm nhân viên theo số điện thoại
        /// </summary>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="pageSize">Số nhân viên mỗi trang</param>
        /// <param name="mobile">Số điện thoại nhân viên</param>
        /// <returns>Thông tin các nhân viên tìm được</returns>
        /// /// Created by: nkmdang (2/10/2023)
        public async Task<Employee> GetEmployeeByMobileAsync(int page, int pageSize, string mobile)
        {
            // Tạo câu lệnh SQL
            string sql = $"SELECT * FROM view_read_getemployeespagination ve WHERE ve.Mobile = @Mobile ORDER BY SUBSTRING_INDEX(ve.FullName, ' ', -1), ve.FullName ASC, ve.EmployeeCode ASC LIMIT @PageSize OFFSET @Page";

            // Tạo param 
            var param = new DynamicParameters();
            param.Add("Mobile", mobile);
            param.Add("PageSize", pageSize);
            // Offset trong database bắt đầu từ 0, còn FE là bắt đầu từ 1
            param.Add("Page", page - 1);

            // Thực hiện truy vấn
            var result = await Uow.Connection.QuerySingleOrDefaultAsync<Employee>(sql, param);
            return result;
        }

        /// <summary>
        /// Hàm tìm kiếm nhân viên theo mã nhân viên
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên</param>
        /// <returns>Thông tin nhân viên tìm được</returns>
        /// Created by: nkmdang (27/09/2023)
        public async Task<Employee> GetEmployeeByEmployeeCodeAsync(string employeeCode)
        {
            // Tạo câu lệnh sql
            string sql = EmployeeSQL.GetEmployeeByEmployeeCodeSQL();

            // Tạo param
            var param = new DynamicParameters(employeeCode);
            param.Add("EmployeeCode", employeeCode);
            // Thực thi truy vấn
            var result = await Uow.Connection.QuerySingleOrDefaultAsync<Employee>(sql, param);
            return result;
        }

        /// <summary>
        /// Hàm tìm kiếm nhân viên theo họ tên đầy đủ nhân viên
        /// </summary>
        /// <param name="employeeFullName">Họ tên đầy đủ nhân viên</param>
        /// <returns>Thông tin nhân viên tìm được</returns>
        /// Created by: nkmdang (27/09/2023)
        public async Task<List<Employee>> GetEmployeeByFullNameAsync(int page, int pageSize, string employeeFullName)
        {
            // Tạo câu lệnh SQL
            string sql = $"SELECT * FROM view_read_getemployeespagination ve WHERE FullName = @FullName ORDER BY SUBSTRING_INDEX(ve.FullName, ' ', -1), ve.EmployeeCode ASC LIMIT @PageSize OFFSET @PAGE";
            var param = new DynamicParameters();
            param.Add("FullName", employeeFullName);
            param.Add("PageSize", pageSize);
            param.Add("Page", page - 1);
            var result = await Uow.Connection.QueryAsync<Employee>(sql, param);
            return result.ToList();
        }
        #endregion

        #region Chức năng xuất file excel
        public byte[] ExportEmployeeExcelAsync(List<Employee> employees)
        {
            // Tạo ExcelPackage
            ExcelPackage employeeExcelPackage = new ExcelPackage();
            
            // Tạo WorkSheet
            var workSheet = employeeExcelPackage.Workbook.Worksheets.Add("Sheet1");
            workSheet.TabColor = System.Drawing.Color.Black;
            workSheet.DefaultRowHeight = 12;
            workSheet.Cells.Style.Font.Name = "Arial";
            // Tạo các header
            workSheet.Row(1).Height = 20;
            workSheet.Row(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            workSheet.Row(1).Style.Font.Bold = true;
            workSheet.Column(5).Style.Numberformat.Format = "dd-MM-yyyy";
            workSheet.Column(9).Style.Numberformat.Format = "dd-MM-yyyy";
            workSheet.Cells[1, 1].Value = "STT";
            workSheet.Cells[1, 2].Value = "Mã nhân viên";
            workSheet.Cells[1, 3].Value = "Tên nhân viên";
            workSheet.Cells[1, 4].Value = "Giới tính";
            workSheet.Cells[1, 5].Value = "Ngày sinh";
            workSheet.Cells[1, 6].Value = "Chức danh";
            workSheet.Cells[1, 7].Value = "Tên đơn vị";
            workSheet.Cells[1, 8].Value = "Số CMND";
            workSheet.Cells[1, 9].Value = "Ngày cấp";
            workSheet.Cells[1, 10].Value = "Nơi cấp";
            workSheet.Cells[1, 11].Value = "Địa chỉ";
            workSheet.Cells[1, 12].Value = "Điện thoại cố định";
            workSheet.Cells[1, 13].Value = "Điện thoại di động";
            workSheet.Cells[1, 14].Value = "Email";
            workSheet.Cells[1, 15].Value = "Tài khoản ngân hàng";
            workSheet.Cells[1, 16].Value = "Tên ngân hàng";
            workSheet.Cells[1, 17].Value = "Chi nhánh";

            // Truyền dữ liệu vào bảng
            int recordIndex = 2;
            foreach(var employee in employees)
            {
                workSheet.Cells[recordIndex, 1].Value = recordIndex - 1;
                workSheet.Cells[recordIndex, 2].Value = employee.EmployeeCode;
                workSheet.Cells[recordIndex, 3].Value = employee.FullName;
                if(employee.Gender == Gender.Male)
                {
                workSheet.Cells[recordIndex, 4].Value = "Nữ";
                } 
                else if(employee.Gender == Gender.FeMale)
                {
                    workSheet.Cells[recordIndex, 4].Value = "Nam";
                } 
                else
                {
                    workSheet.Cells[recordIndex, 4].Value = "Khác";
                }
                workSheet.Cells[recordIndex, 5].Value = employee.DateOfBirth;
                workSheet.Cells[recordIndex, 6].Value = employee.PositionName;
                workSheet.Cells[recordIndex, 7].Value = employee.DepartmentName;
                workSheet.Cells[recordIndex, 8].Value = employee.PersonalIdentification;
                workSheet.Cells[recordIndex, 9].Value = employee.PICreatedDate;
                workSheet.Cells[recordIndex, 10].Value = employee.PICreatedPlace;
                workSheet.Cells[recordIndex, 11].Value = employee.Address;
                workSheet.Cells[recordIndex, 12].Value = employee.LandLinePhone;
                workSheet.Cells[recordIndex, 13].Value = employee.Mobile;
                workSheet.Cells[recordIndex, 14].Value = employee.Email;
                workSheet.Cells[recordIndex, 15].Value = employee.BankAccount;
                workSheet.Cells[recordIndex, 16].Value = employee.BankName;
                workSheet.Cells[recordIndex, 17].Value = employee.BankBranch;
                recordIndex++;
            }

            // Hiển thị vừa vặn dữ liệu trên ô excel
            for(int i = 0; i < 17; i++)
            {
                workSheet.Column(i + 1).AutoFit();
            }

            // Trả về dạng các byte
            var excelBytes = employeeExcelPackage.GetAsByteArray();

            return excelBytes;
        }
        #endregion
    }
}
