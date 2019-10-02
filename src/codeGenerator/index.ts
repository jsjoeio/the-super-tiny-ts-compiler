export function codeGenerator(node: any): any {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n');
    case 'ExpressionStatement':
      return codeGenerator(node.expression) + ';';

    case 'CallExpression':
      return codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')';

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    // If we havent recognized the node, throw an error
    default:
      throw new TypeError(node.type);
  }
}
