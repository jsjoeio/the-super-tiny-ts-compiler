import { Token } from '../tokenizer';

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
  arguments: any[];
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
export type Node = ASTNode | CallExpressionNode | StringLiteralNode | NumberLiteralNode;
/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                                THE PARSER!!!
 * ============================================================================
 */

/**
 * For our parser we're going to take our array of tokens and turn it into an
 * AST.
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */

export function parser(tokens: readonly Token[]) {
  // Similar to before, we keep a current variable that we will use as a cursor
  let current = 0;

  // Instead of a while loop, we're going to use recursion
  function walk(): Node | CallExpressionNode {
    // Grab the first token
    let token = tokens[current];

    // We're going to split each type of token off into a different code path
    if (token.type === 'number') {
      // If we have one, we'll increment current
      current++;

      // And we'll return a new AST node called `NumberLiteral` and set the value to the value of the token.
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    // We'll do the same for strings
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    // Next we're going to look for CallExpressions
    if (token.type === 'paren' && token.value === '(') {
      // we'll increment current to skip the parenthesis since we don't care about it in our AST.
      token = tokens[++current];

      // We create a base node with the type 'CallExpression' and we're going to set the name as the current token's value since the next token after the open parenthesis is the name of the funciton.
      let node: CallExpressionNode = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      // We increment 'current' again to skip the name token.
      token = tokens[++current];

      while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
        // We'll call the walk funciton which will return a node and we'll push it into our node.params
        node.params = node.params.concat(walk());
        token = tokens[current];
      }
      // Finally we will increment 'current' one last time to skip the closing parenthesis
      current++;

      // And return the node.
      return node;
    }

    // Again if we haven't recognized the token type by now we're going to throw an error
    throw new TypeError(token.type);
  }

  // Now, we're going to create our AST which will have a root which is a Program node
  let ast: ASTNode = {
    type: 'Program',
    body: [],
  };

  // And we're going to kickstart our 'walk' function, pushing nodes to our ast.body array

  // The reason we're doing this inside a loop is because our porgram can have CallExpression after one another instead of being nested
  while (current < tokens.length) {
    ast.body = ast.body.concat(walk());
  }

  // At the end of our parser we'll return the AST
  return ast;
}
