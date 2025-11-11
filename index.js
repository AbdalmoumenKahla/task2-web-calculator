function calculateExpression(expression) {

  const tokens = expression.split(" ").filter(token => token !== '');
  
  let values = [];
  let ops = [];
  
 
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const num = Number(token);

    if (!isNaN(num)) {
      values.push(num);
    } else if (token === "(") {
      ops.push(token);
    } else if (token === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
      }
      ops.pop(); 
    } else if (["+", "-", "*", "/"].includes(token)) {
      while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
      }
      ops.push(token); 
    }
  }
  

  while (ops.length) {
    let val2 = values.pop();
    let val1 = values.pop();
    let op = ops.pop();
    values.push(applyOp(val1, val2, op));
  }
  
  return values[0];
}

function applyOp(a, b, op) {
  switch(op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
  }
}

function precedence(op) {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/") return 2;
  return 0;
}

const textbox = document.getElementById("display");

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function() {
      const value = this.innerText;
      if (value === '=') {
        textbox.value = calculateExpression(textbox.value);
      }
      else if (value === 'C') {
        textbox.value = '';
      } else if (value === '←') { 
        textbox.value = textbox.value.slice(0, -1);
      }
      else if(value === '+' || value === '-' || value === '*' || value === '/' || value === '(' || value === ')'){
        textbox.value += " " + value + " ";
      }
      else {
        textbox.value += value;
      }
    });
  });
});
