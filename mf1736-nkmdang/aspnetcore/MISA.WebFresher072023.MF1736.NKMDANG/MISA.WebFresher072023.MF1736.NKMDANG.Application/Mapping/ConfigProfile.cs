using AutoMapper;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    public class ConfigProfile : Profile
    {
        public ConfigProfile()
        {
            CreateMap<Config, ConfigDTO>();
            CreateMap<ConfigDTO, Config>();
            CreateMap<ConfigCreateDTO, Config>();
            CreateMap<ConfigUpdateDTO, Config>();
        }

    }
}
