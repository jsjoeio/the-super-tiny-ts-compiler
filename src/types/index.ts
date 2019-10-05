export type ASTNode = {
  // this is a type literal
  type: 'Program';
  body: Node[];
  _context?: Node[];
};

export type CallExpressionNode = {
  type: 'CallExpression';
  name: string;
  params: Node[];
  _context?: Array<CallExpressionNode | TransformedCallExpressionNode | Node>;
};

export type TransformedCallExpressionNode = {
  type: 'CallExpression';
  callee: {
    type: 'Identifier';
    name: string;
  };
  arguments: Node[];
  _context?: Node[];
};

export type ExpressionStatementNode = {
  type: 'ExpressionStatement';
  expression: TransformedCallExpressionNode;
};

export type StringLiteralNode = {
  type: 'StringLiteral';
  value: string;
  _context?: Node[];
};

export type NumberLiteralNode = {
  type: 'NumberLiteral';
  value: string;
  _context?: Node[];
};

// discriminated union type
export type Node = ASTNode | CallExpressionNode | StringLiteralNode | NumberLiteralNode | TransformedCallExpressionNode;
