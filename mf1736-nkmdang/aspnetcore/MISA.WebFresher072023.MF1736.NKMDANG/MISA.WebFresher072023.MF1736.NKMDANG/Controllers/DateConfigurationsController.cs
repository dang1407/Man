using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.WebFresher072023.MF1736.NKMDANG.Application;
using MISA.WebFresher072023.MF1736.NKMDANG.Controllers.Base;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Controllers
{
    public class DateConfigurationsController : BaseReadOnlyController<DateConfigurationDTO>
    {
        public DateConfigurationsController(IDateConfigurationService dateFormatService) : base(dateFormatService)
        {
        }


        /// <summary>
        /// Hàm lấy ra tất cả thông tin DateConfigurationDTO
        /// </summary>
        /// <returns>Thông tin DateConfigurationDTO</returns>
        /// Created By: nkmdang (07/10/2023)
        [HttpGet]
        public async Task<List<DateConfigurationDTO>> GetAllAsync()
        {
            var result = await BaseReadOnlyService.GetAllAsync();
            return result;
        }
    }
}
