using MISA.WebFresher072023.MF1736.NKMDANG.Application;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Infrastructure
{
    public class DateConfigurationRepository : BaseRepository<DateConfiguration>, IDateConfigurationRepository
    {
        public DateConfigurationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
    }
}
