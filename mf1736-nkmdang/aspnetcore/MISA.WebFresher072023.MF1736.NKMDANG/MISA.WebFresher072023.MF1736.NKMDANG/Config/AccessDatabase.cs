using MySqlConnector;

namespace MISA.WebFresher072023.MF1736.NKMDANG
{
    public class AccessDatabase
    {
        /// <summary>
		/// Connect Database
		/// </summary>
		/// Created by: NKMDANG (09/09/2023)
		/// 
		//private static readonly string connectionString = "Server=18.179.16.166;Port=3306;Database=NVMANH.DEMO;Uid=nvmanh;Pwd=12345678;";

        private static readonly string connectionString = "Server=127.0.0.1;Port=3306;Database=MISA.WEB202307_MF1736_NKMDANG;Uid=root;Pwd=123456;";
        public static MySqlConnection ConnectDatabase()
        {
            var connection = new MySqlConnection(connectionString);
            return connection;
        }
    }
}
