import {
  ASTNode,
  Node,
  NumberLiteralNode,
  StringLiteralNode,
  CallExpressionNode,
  TransformedCallExpressionNode,
  ExpressionStatementNode,
} from '../types';
import { traverser } from '../traverser';

export function transformer(ast: ASTNode) {
  // We'll create a newAST
  let newAst: ASTNode = {
    type: 'Program',
    body: [],
  };

  // the context is a reference from the old ast to the new ast
  ast._context = newAst.body;

  traverser(ast, {
    // The first visitor method accepts any 'NumebrLiteral'
    NumberLiteral: {
      // We'll visit them on enter
      enter(node: NumberLiteralNode, parent: Node) {
        // We'll create a new node also named 'NumberLiteral' that we will push
        // to the parent context
        if (parent._context) {
          parent._context = parent._context.concat({
            type: 'NumberLiteral',
            value: node.value,
          });
        } else {
          parent._context = [
            {
              type: 'NumberLiteral',
              value: node.value,
            },
          ];
        }
      },
    },

    // Next we'll have a StringLiteral
    StringLiteral: {
      enter(node: StringLiteralNode, parent: Node) {
        if (parent._context) {
          parent._context = parent._context.concat({
            type: 'StringLiteral',
            value: node.value,
          });
        } else {
          parent._context = [
            {
              type: 'StringLiteral',
              value: node.value,
            },
          ];
        }
      },
    },

    // Next up, CallExpression
    CallExpression: {
      enter(node: CallExpressionNode, parent: Node) {
        // we'll start by creating a new node CallExpression with a nested Identifier
        let expression: TransformedCallExpressionNode | ExpressionStatementNode = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        // Next we're going to define a new context on the original
        // to erefence the expression's arguments
        // so that we can push arguments.
        node._context = expression.arguments;

        // Then we're going to check if the parent node is a CallExpression
        // If iti s not
        if (parent.type !== 'CallExpression') {
          // We're going to wrap our CallExpression with an ExpressionStatement
          // We do this because the top level CallExprssion in JavaScript are actually Statements
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }

        // Last we'll push our (possibly wrapped) CallExpression to the parents context
        if (parent._context) {
          // @ts-ignore
          parent._context = parent._context.concat(expression);
        } else {
          // @ts-ignore
          parent._context = [expression];
        }
      },
    },
  });

  // At the end of our transformer, we'll return the new ast that we just created
  return newAst;
}
