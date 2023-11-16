using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher072023.MF1736.NKMDANG.UnitTests
{
    /// <summary>
    /// 
    /// </summary>
    [TestFixture]
    public class CalculatorTests
    {

        /// <summary>
        /// Hàm Unit test tổng 2 số
        /// </summary>
        //[Test] Test có sẵn
        [TestCase] // Test nhận tham số đầu vào
        public void Add_ValidInput_Sum2Digit()
        {
            // Arrange
            var x = 1;
            var y = 2;
            var expectedResult = 3;

            var calculator = new Calculator();


            // Act
            var actualResult = calculator.Add(x, y);

            // Assert
            Assert.That(actualResult, Is.EqualTo(expectedResult));
        }

        /// <summary>
        /// Hàm Unit test tổng 2 số
        /// </summary>
        [TestCase(1, 2, 3)] // Test nhận tham số đầu vào
        [TestCase(2, 3, 5)]
        [TestCase(2, -3, -1)]
        [TestCase(1, int.MaxValue, int.MaxValue + (long)1)]
        public void Add_ValidInput_Sum2Digit_TestCase(int x, int y, long expectedResult)
        {

            var calculator = new Calculator();


            // Act
            var actualResult = calculator.Add(x, y);

            // Assert
            Assert.That(actualResult, Is.EqualTo(expectedResult));
        }


        /// <summary>
        /// Hàm Unit test hiệu 2 số
        /// </summary>
        //[Test] Test có sẵn
        [TestCase(5, 2, 3)] // Test nhận tham số đầu vào
        [TestCase(int.MaxValue, int.MinValue, (long)int.MaxValue * 2 + 1)]
        public void Sub_ValidInput_Sub2Digit(int x, int y, long expectedResult)
        {

            var calculator = new Calculator();


            // Act
            var actualResult = calculator.Sub(x, y);

            // Assert
            Assert.That(actualResult, Is.EqualTo(expectedResult));
        }

        /// <summary>
        /// Hàm Unit Test phép chia cho 0
        /// </summary>
        /// Created By: nkmdang (13/09/2023)
        [Test]
        public void Div_DivideByZero_ThrowException()
        {
            // Arrange
            var calculator = new Calculator();
            var x = 1;
            var y = 0;
            var excetionMessage = "Không được chia cho 0!";

            // Act
            try
            {
                var actualResult = calculator.Div(x, y);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.That(ex.Message, Is.EqualTo(excetionMessage));
            }

        }


        #region Add Overloading Test case
        /// <summary>
        /// Test hàm Add nhận vào chuỗi s hợp lệ
        /// </summary>
        /// <param name="s">Chuỗi kí tự chứa các số dương, ngăn cách bởi dấu ,</param>
        /// <param name="expectedResult">Tổng các số nguyên chứa trong s</param>
        /// Created By: nkmdang 12/09/2023
        [TestCase("1,2,3", 6)]
        [TestCase("1, 2, 3", 6)]
        [TestCase("", 0)]
        [TestCase(null, 0)]
        [TestCase("                ", 0)]
        [TestCase("1", 1)]
        [TestCase("36", 36)]
        public void Add_ValidNormalInputString_SumAllNumbers(string s, long expectedResult)
        {
            // Arrange
            var calculator = new Calculator();


            // Act
            var actualResult = calculator.Add(s);

            // Assert
            Assert.That(actualResult, Is.EqualTo(expectedResult));

        }

        /// <summary>
        /// Hàm Unit test các trường hợp hàm Add xảy ra Exception
        /// </summary>
        /// <param name="s">String chứa các số âm, kí tự không hợp lệ</param>
        /// <param name="expectedResult">Báo những số âm nếu chuỗi chỉ có số âm, báo chuỗi phải đúng định dạng nếu đầu vào chứa các kí tự không hợp lệ</param>
        /// Created By: nkmdang (14/09/2023)

        [TestCase("1, -2, -3", "Không chấp nhận toán hạng âm -2, -3")]
        [TestCase("1,-2,-3", "Không chấp nhận toán hạng âm -2, -3")]
        [TestCase("1,-2,-3, -5, -6, -7", "Không chấp nhận toán hạng âm -2, -3, -5, -6, -7")]
        [TestCase("1, a, 3", "Chuỗi đầu vào phải bao gồm các số tự nhiên ngăn cách nhau bởi dấu phẩy!")]
        [TestCase("1, {2}, 3", "Chuỗi đầu vào phải bao gồm các số tự nhiên ngăn cách nhau bởi dấu phẩy!")]
        public void Add_ExceptionInputString_ThrowException(string s, string expectedResult)
        {
            // Arrange
            var calculator = new Calculator();

            try
            {
                // Act
                var actualResult = calculator.Add(s);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.That(ex.Message, Is.EqualTo(expectedResult));
            }

        }  
        #endregion
    }
}
