using Microsoft.AspNetCore.Mvc;
using MISA.WebFresher072023.MF1736.NKMDANG.Application;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Controllers.Base
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseReadOnlyController<TDTO> : ControllerBase
    {
        protected readonly IBaseReadOnlyService<TDTO> BaseReadOnlyService;

        public BaseReadOnlyController(IBaseReadOnlyService<TDTO> baseReadOnlyService)
        {
            BaseReadOnlyService = baseReadOnlyService;
        }

        ///// <summary>
        ///// Lấy ra toàn bộ dữ liệu về tài nguyên 
        ///// </summary>
        ///// <returns>EmployeeEntity nếu thành công, mã lỗi nếu thất bại</returns>
        ///// Created by: nkmdang (20/09/2023)
        //[HttpGet]
        //[Route("s")]
        //public virtual async Task<List<TDTO>> GetAllAsync()
        //{
        //    var result = await BaseReadOnlyService.GetAllAsync();
        //    return result;
        //}

        /// <summary>
        /// Lấy ra thông tin tài nguyên theo id (char(36))
        /// </summary>
        /// <param name="id">Tham số nhận vào từ route</param>
        /// <returns>Thông tin tài nguyên nếu thành công, mã lỗi nếu thất bại</returns>
        /// Created by: nkmdang (20/09/2023)
        [HttpGet]
        [Route("{id}")]
        public async Task<TDTO> GetByIdAsync(Guid id)
        {
            var result = await BaseReadOnlyService.GetByIdAsync(id);
            return result;

        }
    }
}
