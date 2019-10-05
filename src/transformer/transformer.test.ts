import { transformer } from './';
import { ASTNode } from '../types';

describe('transformer', () => {
  it('should turn `ast` into a `newAst`', () => {
    const ast: ASTNode = {
      type: 'Program',
      body: [
        {
          type: 'CallExpression',
          name: 'add',
          params: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpression',
              name: 'subtract',
              params: [
                {
                  type: 'NumberLiteral',
                  value: '4',
                },
                {
                  type: 'NumberLiteral',
                  value: '2',
                },
              ],
            },
          ],
        },
      ],
    };
    const newAst = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '2',
              },
              {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'subtract',
                },
                arguments: [
                  {
                    type: 'NumberLiteral',
                    value: '4',
                  },
                  {
                    type: 'NumberLiteral',
                    value: '2',
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    const actual = transformer(ast);
    expect(actual).toMatchObject(newAst);
  });
});
