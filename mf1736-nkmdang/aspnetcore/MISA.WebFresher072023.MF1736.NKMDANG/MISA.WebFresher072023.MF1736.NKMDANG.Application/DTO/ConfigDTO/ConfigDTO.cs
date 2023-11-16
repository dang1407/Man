﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    /// <summary>
    /// Lớp ConfigDTO
    /// </summary>
    /// Created by: nkmdang (07/10/2023)
    public class ConfigDTO : BaseDTO
    {
        /// <summary>
        /// Định danh của Config (Guid)
        /// </summary>
        public Guid ConfigId { get; set; }

        /// <summary>
        /// Định danh của DateConfiguration (định dạng ngày tháng năm sẽ hiển thị ra FE)
        /// </summary>
        public Guid DateConfigurationId { get; set; }

        /// <summary>
        /// Chuỗi biểu diễn định dạng DateConfiguration
        /// </summary>
        /// Created by: nkmdang (07/10/2023)
        public string DatePattern { get; set; }
    }
}
