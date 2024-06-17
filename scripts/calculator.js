class Calculator {
  constructor() {
    this.display = document.getElementById('display');
    this.buttons = document.getElementById('buttons');
    this.createButtons();
    this.bindEvents();
    this.clear();
  }

  createButtons() {
    const buttons = [
      '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'
    ];
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.innerText = button;
      btn.addEventListener('click', this.handleButtonClick.bind(this));
      this.buttons.appendChild(btn);
    });
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleButtonClick(e) {
    const value = e.target.innerText;
    this.handleInput(value);
  }

  handleKeyPress(e) {
    const value = e.key;
    if (/[\d\+\-\*\/\=\.]/.test(value)) {
      this.handleInput(value);
    }
  }

  handleInput(value) {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.performOperation(value);
        break;
      case '=':
        this.evaluate();
        break;
      case 'C':
        this.clear();
        break;
      default:
        this.display.value += value;
    }
  }

  performOperation(operation) {
    const lastChar = this.display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      this.display.value = this.display.value.slice(0, -1) + operation;
    } else {
      this.display.value += operation;
    }
  }

  evaluate() {
    try {
      const result = eval(this.display.value);
      this.display.value = result;
    } catch (e) {
      this.display.value = 'Error';
    }
  }

  clear() {
    this.display.value = '';
  }
}

new Calculator();
