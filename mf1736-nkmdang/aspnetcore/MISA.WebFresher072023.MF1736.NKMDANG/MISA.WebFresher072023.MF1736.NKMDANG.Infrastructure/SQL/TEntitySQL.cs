using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using MISA.WebFresher072023.MF1736.NKMDANG.SQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.Infrastructure
{
    public class TEntitySQL
    {
    //    private static readonly Dictionary<Type, string> EntitySqlMap = new Dictionary<Type, string>
    //{
    //    { typeof(Employee), (Guid) id => EmployeeSQL.UpdateEmployeeByIdSQL(id) },
    //    { typeof(Department), DepartmentSQL.UpdateDepartmentSQL() },
    //    { typeof(Config), "UPDATE Config c SET ConfigId = @ConfigId, DateConfigurationId = @DateConfigurationId, CreatedDate = @CreatedDate, CreatedBy = @CreatedBy, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy" },
    //    // Thêm các ánh xạ cho các loại Entity khác nếu cần
    //};

    //    public static string GetUpdateSql<TEntity>() where TEntity : IEntity
    //    {
    //        Type entityType = typeof(TEntity);
    //        if (EntitySqlMap.ContainsKey(entityType))
    //        {
    //            return EntitySqlMap[entityType];
    //        }
    //        else
    //        {
    //            throw new Exception($"Câu lệnh SQL cho phương thức Update {entityType.Name} chưa được xác định.");
    //        }
    //    }
        /// <summary>
        /// Tạo câu lệnh SQL lấy toàn bộ thông tin nhân viên trong bảng Employee
        /// </summary>
        /// <returns>sql (string)</returns>
        /// Created By: nkmdang (11/09/2023)
        public static string GetAllSQL(string tableName)
        {
            var sql = $"CALL Proc_Read_GetAll{tableName}s()";
            return sql;
        }

        /// <summary>
        /// Tạo câu lệnh SQL lấy thông tin nhân viên theo Id
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns>sql (string)</returns>
        /// Created By: nkmdang (11/09/2023)
        public static string GetByIdSQL(string tableName, Guid employeeId)
        {
            string sql = $"SELECT * FROM {tableName} WHERE {tableName}Id = @{tableName}Id";
            return sql;
        }

        /// <summary>
        /// Hàm tạo câu lệnh SQL lấy nhiều theo Id
        /// </summary>
        /// <param name="tableName">Tên bảng muốn lấy ra bản ghi</param>
        /// <returns>Câu lệnh SQL lấy nhiều theo Id </returns>
        /// Created by: nkmdang (21/09/2023)
        public static string GetByListIdSQL(string tableName)
        {
            string sql = $"SELECT * FROM {tableName} WHERE {tableName}Id IN @ids";
            return sql;
        }

        /// <summary>
        /// Tạo câu lệnh SQL để thêm mới một nhân viên sử dụng DepartmentName
        /// </summary>
        /// <returns>sql (string)</returns>
        /// Created By: nkmdang (13/09/2023)
        public static string InsertSQL(string tableName, string propertiesString)
        {
            //string sql = $"Call Proc_Create_Insert{tableName}(@EmployeeId, @EmployeeCode,  @FullName,  @DepartmentName,  @Gender,  @DateOfBirth,  @Address,  @BankName,  @BankBranch,  @BankAccount,  @Email,  @Mobile,  @LandLinePhone,  @PersonalIdentification,  @PICreatedDate,  @PICreatedPlace,  @PositionName,  @CreatedDate,  @CreatedBy, @ModifiedDate, @ModifiedBy)";
             string sql = $"Call Proc_Create_Insert{tableName}()";
            return sql;
        }

        /// <summary>
        /// Tạo câu lệnh SQL để xóa thông tin một nhân viên theo EmployeeId
        /// </summary>
        /// <param name="employeeId">Id của nhân viên (Guid)</param>
        /// <returns>sql (string)</returns>
        /// Created By: nkmdang (11/09/2023)
        public static string DeleteByIdSQL(string tableName, Guid employeeId)
        {
            string sql = $"CALL Proc_Delete_Delete{tableName}ById('{employeeId}')";
            return sql;
        }

        /// <summary>
        /// Tạo câu lệnh SQL để xóa nhiều bản ghi theo List Id
        /// </summary>
        /// <param name="tableName">Tên bảng muốn xóa các bản ghi</param>
        /// <returns>Câu lệnh SQL</returns>
        /// Created by: nkmdang (21/09/2023)
        public static string DeleteByListIdSQL(string tableName)
        {
            string sql = $"DELETE FROM {tableName} WHERE {tableName}Id IN @ids";
            return sql;
        }
    }
}
