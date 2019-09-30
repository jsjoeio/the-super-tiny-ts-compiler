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
});
