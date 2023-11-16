using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Application
{
    public interface IUnitOfWork :IDisposable, IAsyncDisposable
    {
        DbConnection Connection { get; }    
        DbTransaction? Transaction { get; }
        void BeginTransaction();
        Task BeginTransactionAsync();
        void Commit();
        Task CommitAsync();
        void RollBack();
        Task RollBackAsync();

    }
}
 