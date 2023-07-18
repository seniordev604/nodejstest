import * as fs from 'fs';

interface NodeWithValue {
  value: number;
}

interface NodeWithAction {
  action: '+' | '-' | '*' | '/' | '^';
  left: Node;
  right: Node;
}

type Node = NodeWithValue | NodeWithAction;

function evaluateExpressionTree(tree: Node): number {
    const stack: number[] = [];
  
    const traverseTree = (node: Node) => {
      if ('value' in node) {
        stack.push(node.value);
      } else if ('action' in node) {
        traverseTree(node.left);
        traverseTree(node.right);
  
        const right = stack.pop();
        const left = stack.pop();
  
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Invalid expression tree');
        }
  
        switch (node.action) {
          case '+':
            stack.push(left + right);
            break;
          case '-':
            stack.push(left - right);
            break;
          case '*':
            stack.push(left * right);
            break;
          case '/':
            stack.push(left / right);
            break;
          case '^':
            stack.push(Math.pow(left, right));
            break;
          default:
            throw new Error(`Invalid action: ${node.action}`);
        }
      }
    };
  
    traverseTree(tree);
  
    if (stack.length !== 1) {
      throw new Error('Invalid expression tree');
    }
  
    return stack[0];
  }

// Read the filename from command-line arguments
const filename = 'sample_data.json';

// Read and parse the JSON file
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const tree: Node = JSON.parse(data);
    const result = evaluateExpressionTree(tree);
    console.log('Output:', result);
  } catch (error) {
    console.error('Error parsing or evaluating the expression tree:', error);
  }
});