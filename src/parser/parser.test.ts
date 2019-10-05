import { parser } from './';
import { tokenizer } from '../tokenizer';

describe('parser', () => {
  it('should return ast', () => {
    const code = '(subtract 4 2)';
    const tokens = tokenizer(code);
    const actual = parser(tokens);
    // It should return AST
    expect(actual.type).toBe('Program');

    // It should have a body property
    expect(Array.isArray(actual.body)).toBe(true);
  });
  it('should trun `tokens` array into `ast`', () => {
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'paren', value: '(' },
      { type: 'name', value: 'subtract' },
      { type: 'number', value: '4' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' },
      { type: 'paren', value: ')' },
    ];
    const ast = {
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

    const actual = parser(tokens);
    expect(actual).toMatchObject(ast);
  });
});
