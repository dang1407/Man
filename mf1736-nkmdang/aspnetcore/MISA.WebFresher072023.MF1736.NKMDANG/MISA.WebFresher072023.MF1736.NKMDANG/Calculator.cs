namespace MISA.WebFresher072023.MF1736.NKMDANG
{
    public class Calculator
    {
        /// <summary>
        /// Hàm cộng 2 số nguyên
        /// </summary>
        /// <param name="x">Toán hạng 1</param>
        /// <param name="y">Toán hạng 2</param>
        /// <returns>Tổng hai số nguyên</returns>
        /// Created by: nkmdang (12/09/2023)
        public long Add(int x, int y)
        {
            return x + (long)y;
        }


        /// <summary>
        /// Kiêm tra 1 kí tự có phải kí tự số hay không
        /// </summary>
        /// <param name="c">Kí tự char</param>
        /// <returns>True or false</returns>
        /// Created By: nkmdang (12/09/2023)
        public bool IsDigit(char c)
        {
            if ('0' <= c && c <= '9')
            {
                return true;
            }
            else return false;
        }


        /// <summary>
        /// Chuyển kí tự c sang số nguyên kiểu int
        /// </summary>
        /// <param name="c">Kí tự char</param>
        /// <returns>Sô nguyên có giá trị tương ứng với c</returns>
        /// Create By: nkmdang (12/09/2023)
        public int GetDigit(char c)
        {
            if (IsDigit(c))
            {
                return (int)c - 48;
            }
            else return -1;
        }


        /// <summary>
        /// Lấy ra các số nguyên dương trong s khi s chỉ gồm các số nguyên dương, ngăn cách với nhau bằng dấu ",", chấp nhận có khoảng trắng
        /// </summary>
        /// <param name="s">Chuỗi kí tự s chứa khoảng trắng, dấu ",", và các số nguyên</param>
        /// <returns></returns>
        public List<int> AnalysAddInputString(string s)
        {
            List<int> result = new List<int>(); 
            
            // Chuỗi rỗng cần trả về số 0
            if(String.Compare(s, "") == 0 || s == null)
            {
                result.Add(0);
                return result;
            }

            string rawS = s;
            s = "";
            for(int i = 0; i < rawS.Length; i++)
            {
                if (rawS[i] != ' ')
                {
                    s += rawS[i];
                }
            }
            if (String.Compare(s, "") == 0)
            {
                result.Add(0);
                return result;
            }
            // Các trường hợp chuỗi đầu vào hợp lệ
            for (int i = s.Length - 1; i >= 0; i--)
            {
                if (IsDigit(s[i]))
                {
                    int currentOperator = 0, index = 0;
                    while (IsDigit(s[i]))
                    {
                        currentOperator += GetDigit(s[i]) * (int)Math.Pow(10, index);
                        index++;
                        if (i > 0)
                            i--;
                        else break;
                    }
                    result.Add(currentOperator);
                    if (s[i] == ' ' || s[i] == ',' || IsDigit(s[i]))
                    {
                        continue;
                    } else if (s[i] == '-')
                    {
                        currentOperator = -currentOperator;
                        result.Add(currentOperator);
                    }
                    else throw new Exception("Chuỗi đầu vào phải bao gồm các số tự nhiên ngăn cách nhau bởi dấu phẩy!");
                }
                else
                {
                    if (s[i] == ' ' || s[i] == ',')
                    {
                        continue;
                    }
                    else throw new Exception("Chuỗi đầu vào phải bao gồm các số tự nhiên ngăn cách nhau bởi dấu phẩy!");
                }
            }
            // Đảo ngược lại chuỗi
            result.Reverse();   
            return result;
        }

        /// <summary>
        /// Tính tổng các số trong chuỗi đầu vào
        /// </summary>
        /// <param name="x">Chuỗi kí tự x chứa khoảng trắng, dấu ",", và các số nguyên</param>
        /// <returns>Tổng các số nguyên trong x khi x hợp lệ, Exception nếu x không hợp lệ</returns>
        /// Created By: nkmdang (12/09/2023)
        public long Add(string x)
        {
            List<int> elements = AnalysAddInputString(x);
            if(elements.Count == 0) 
            {
                throw new Exception("Chuỗi đầu vào phải bao gồm các số tự nhiên ngăn cách nhau bởi dấu phẩy!");
            }
            bool checkMinus = false;
            string exceptionMessage = "";


            long result = 0;
            foreach (int element in elements)
            {
                if (element < 0)
                {
                    checkMinus = true;
                    exceptionMessage = exceptionMessage + element + ", ";
                }
                result += element;
            }

            if (checkMinus)
            {
                exceptionMessage = exceptionMessage.Substring(0, exceptionMessage.Length - 2);
                exceptionMessage = "Không chấp nhận toán hạng âm " + exceptionMessage;
                throw new Exception(exceptionMessage);
            }
            return result;
        }


        /// <summary>
        /// Hàm trừ 2 số nguyên
        /// </summary>
        /// <param name="x">Số bị trừ</param>
        /// <param name="y">Số trừ</param>
        /// <returns>Hiệu của x và y</returns>
        /// Created by: nkmdang (12/09/2023)
        public long Sub(int x, int y)
        {
            return (long)x - y;
        }


        /// <summary>
        /// Hàm nhân 2 số nguyên
        /// </summary>
        /// <param name="x">Số bị nhân</param>
        /// <param name="y">Số nhân</param>
        /// <returns>Tích 2 số x và y</returns>
        /// Created by: nkmdang (12/09/2023)
        public long Mul(int x, int y)
        {
            return (long)x * y;
        }


        /// <summary>
        /// Hàm chia 2 số nguyên
        /// </summary>
        /// <param name="x">Số bị chia</param>
        /// <param name="y">Số chia</param>
        /// <returns>Thương 2 số x và y</returns>
        /// Created by: nkmdang (12/09/2023)
        public float Div(int x, int y)
        {
            if(y == 0)
            {
                throw new Exception("Không được chia cho 0!");
            }
            return (long)x / y;
        }
    }
}
