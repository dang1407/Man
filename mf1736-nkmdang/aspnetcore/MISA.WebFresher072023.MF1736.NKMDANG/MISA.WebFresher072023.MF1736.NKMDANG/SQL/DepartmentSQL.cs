namespace MISA.WebFresher072023.MF1736.NKMDANG.SQL
{
    public class DepartmentSQL
    {
        public static string GetAllDepartmentsSQL()
        {
            string sql = "CALL Proc_Read_GetAllDepartments()";
            return sql;
        }
    }
}
