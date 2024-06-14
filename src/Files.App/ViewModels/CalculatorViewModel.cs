using System;
using System.ComponentModel;
using System.Windows.Input;

namespace Files.App.ViewModels
{
    public class CalculatorViewModel : ObservableObject
    {
        private double currentValue;
        private double pendingValue;
        private string pendingOperation;

        public double CurrentValue
        {
            get => currentValue;
            set => SetProperty(ref currentValue, value);
        }

        public ICommand DigitCommand { get; }
        public ICommand OperationCommand { get; }
        public ICommand EqualsCommand { get; }

        public CalculatorViewModel()
        {
            DigitCommand = new RelayCommand<string>(HandleDigit);
            OperationCommand = new RelayCommand<string>(HandleOperation);
            EqualsCommand = new RelayCommand(HandleEquals);
        }

        private void HandleDigit(string digit)
        {
            CurrentValue = CurrentValue * 10 + double.Parse(digit);
        }

        private void HandleOperation(string operation)
        {
            if (pendingOperation != null)
            {
                HandleEquals();
            }

            pendingValue = CurrentValue;
            CurrentValue = 0;
            pendingOperation = operation;
        }

        private void HandleEquals()
        {
            if (pendingOperation == null)
                return;

            double result;
            switch (pendingOperation)
            {
                case "+":
                    result = pendingValue + CurrentValue;
                    break;
                case "-":
                    result = pendingValue - CurrentValue;
                    break;
                case "*":
                    result = pendingValue * CurrentValue;
                    break;
                case "/":
                    result = pendingValue / CurrentValue;
                    break;
                case "^":
                    result = Math.Pow(pendingValue, CurrentValue);
                    break;
                default:
                    throw new InvalidOperationException("Invalid operation");
            }

            CurrentValue = result;
            pendingOperation = null;
        }
    }
}
