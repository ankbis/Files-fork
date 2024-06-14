using Files.App.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Files.App.Tests
{
    [TestClass]
    public class CalculatorViewModelTests
    {
        [TestMethod]
        public void Addition_Test()
        {
            var vm = new CalculatorViewModel();
            vm.DigitCommand.Execute("5");
            vm.OperationCommand.Execute("+");
            vm.DigitCommand.Execute("3");
            vm.EqualsCommand.Execute(null);
            Assert.AreEqual(8, vm.CurrentValue);
        }

        [TestMethod]
        public void Subtraction_Test()
        {
            var vm = new CalculatorViewModel();
            vm.DigitCommand.Execute("10");
            vm.OperationCommand.Execute("-");
            vm.DigitCommand.Execute("4");
            vm.EqualsCommand.Execute(null);
            Assert.AreEqual(6, vm.CurrentValue);
        }

        [TestMethod]
        public void Multiplication_Test()
        {
            var vm = new CalculatorViewModel();
            vm.DigitCommand.Execute("3");
            vm.OperationCommand.Execute("*");
            vm.DigitCommand.Execute("4");
            vm.EqualsCommand.Execute(null);
            Assert.AreEqual(12, vm.CurrentValue);
        }

        [TestMethod]
        public void Division_Test()
        {
            var vm = new CalculatorViewModel();
            vm.DigitCommand.Execute("10");
            vm.OperationCommand.Execute("/");
            vm.DigitCommand.Execute("2");
            vm.EqualsCommand.Execute(null);
            Assert.AreEqual(5, vm.CurrentValue);
        }

        [TestMethod]
        public void Exponent_Test()
        {
            var vm = new CalculatorViewModel();
            vm.DigitCommand.Execute("2");
            vm.OperationCommand.Execute("^");
            vm.DigitCommand.Execute("3");
            vm.EqualsCommand.Execute(null);
            Assert.AreEqual(8, vm.CurrentValue);
        }
    }
}
