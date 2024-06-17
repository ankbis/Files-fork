const assert = require('assert');
const Calculator = require('../scripts/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add two numbers', () => {
    calculator.display.value = '2+3';
    calculator.evaluate();
    assert.strictEqual(calculator.display.value, '5');
  });

  it('should subtract two numbers', () => {
    calculator.display.value = '5-3';
    calculator.evaluate();
    assert.strictEqual(calculator.display.value, '2');
  });

  it('should multiply two numbers', () => {
    calculator.display.value = '4*6';
    calculator.evaluate();
    assert.strictEqual(calculator.display.value, '24');
  });

  it('should divide two numbers', () => {
    calculator.display.value = '10/2';
    calculator.evaluate();
    assert.strictEqual(calculator.display.value, '5');
  });

  it('should handle division by zero', () => {
    calculator.display.value = '10/0';
    calculator.evaluate();
    assert.strictEqual(calculator.display.value, 'Error');
  });

  it('should clear the display', () => {
    calculator.display.value = '123';
    calculator.clear();
    assert.strictEqual(calculator.display.value, '');
  });
});

