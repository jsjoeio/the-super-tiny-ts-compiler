import { ASTNode, Node } from '../types';

export type ParentNode = Node | null;

export function traverser(ast: ASTNode, visitor: any) {
  function traverseArray(array: Node[], parent: ParentNode) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node: Node, parent: ParentNode) {
    // We'll start by testing for existence of a method on the visitor with a matching type
    let methods = visitor[node.type];

    // If there is an enter method, we'll call it with node and parent
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // Next we'll split things by node type
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      // We'll do the same with CallExpression and traverse their params
      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      // NumberLiteral and StringLiteral do not have child nodes so just break
      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      default:
        // use of 'never' bottom type...
        const _exhaustiveCheck: never = node;
        throw new TypeError(_exhaustiveCheck);
    }

    // If there is an exit method, we'll call it with the node and the parent
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // Finally, we kickstart the traverser by calling `traverseNod` with our ast
  // with no parent because the top level of the AST doesnt have a parent
  traverseNode(ast, null);
}
