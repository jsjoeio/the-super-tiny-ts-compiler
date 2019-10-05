import { codeGenerator } from './';

describe('codeGenerator', () => {
  it('should return ast', () => {
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
    const output = 'add(2, subtract(4, 2));';
    const actual = codeGenerator(newAst);
    expect(actual).toBe(output);
  });
});
