using AutoMapper;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    public class DateConfigurationProfile : Profile
    {
        public DateConfigurationProfile() {
            CreateMap<DateConfigurationDTO, DateConfiguration>();
            CreateMap<DateConfiguration, DateConfigurationDTO>();
        }  
    }
}
