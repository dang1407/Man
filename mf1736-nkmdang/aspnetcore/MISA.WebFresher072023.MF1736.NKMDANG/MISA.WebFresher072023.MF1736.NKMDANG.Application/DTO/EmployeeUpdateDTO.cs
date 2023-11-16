using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    public class EmployeeUpdateDTO : BaseDTO
    {
        #region Properties

        /// <summary>
        /// Định danh nhân viên
        /// </summary>
        public Guid EmployeeId { get; set; }


        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Required(ErrorMessage = "EmployeeCode is required.")]
        [RegularExpression(@"^NV-00[0-9]{4}$", ErrorMessage = "Mã nhân viên phải có định dạng NV-00abcd với a,b,c,d là các chữ số tự nhiên.")]
        public string EmployeeCode { get; set; }


        /// <summary>
        /// Họ tên đầy đủ nhân viên
        /// </summary>
        [Required(ErrorMessage = "FullName is required.")]
        [StringLength(100, ErrorMessage = "Full name must be less than 100 characters.")]
        public string FullName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public Gender? Gender { get; set; }


        /// <summary>
        /// Định danh đơn vị
        /// </summary>
        public Guid? DepartmentId { get; set; }


        /// <summary>
        /// Tên đơn vị
        /// </summary>
        public string DepartmentName { get; set; }


        /// <summary>
        /// Điện thoại cố định
        /// </summary>
        public string? LandLinePhone { get; set; }


        /// <summary>
        /// Điện thoại di động
        /// </summary>
        public string? Mobile { get; set; }


        /// <summary>
        /// Phòng ban
        /// </summary>
        public string? PositionName { get; set; }


        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string? Address { get; set; }


        /// <summary>
        /// Tài khoản ngân hàng
        /// </summary>
        public string? BankAccount { get; set; }

        /// <summary>
        /// Chi nhánh ngân hàng
        /// </summary>
        public string? BankBranch { get; set; }


        /// <summary>
        /// Tên ngân hàng
        /// </summary>
        public string? BankName { get; set; }


        /// <summary>
        /// Định danh cá nhân
        /// </summary>
        public string? PersonalIdentification { get; set; }

        /// <summary>
        /// Ngày cấp định danh cá nhân
        /// </summary>
        public DateTime? PICreatedDate { get; set; }


        /// <summary>
        /// Nơi cấp định danh cá nhân
        /// </summary>
        public string? PICreatedPlace { get; set; }


        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }


        #endregion
    }
}
