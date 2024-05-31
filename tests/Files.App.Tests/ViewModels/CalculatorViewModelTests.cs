using Files.App.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Files.App.Tests.ViewModels
{
    [TestClass]
    public class CalculatorViewModelTests
    {
        [TestMethod]
        public void Add_PositiveIntegers_ReturnsSum()
        {
            var calculator = new CalculatorViewModel();
            int result = calculator.Add(5, 3);
            Assert.AreEqual(8, result);
        }

        [TestMethod]
        public void Add_NegativeIntegers_ReturnsSum()
        {
            var calculator = new CalculatorViewModel();
            int result = calculator.Add(-2, -4);
            Assert.AreEqual(-6, result);
        }

        [TestMethod]
        public void Multiply_PositiveIntegers_ReturnsProduct()
        {
            var calculator = new CalculatorViewModel();
            int result = calculator.Multiply(4, 6);
            Assert.AreEqual(24, result);
        }

        [TestMethod]
        public void Multiply_NegativeIntegers_ReturnsProduct()
        {
            var calculator = new CalculatorViewModel();
            int result = calculator.Multiply(-3, 2);
            Assert.AreEqual(-6, result);
        }
    }
}
