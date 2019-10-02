import { compiler } from './index';

describe('compiler', () => {
  it('should compile input to output', () => {
    const input = '(add 2 (subtract 4 2))';
    const output = 'add(2, subtract(4, 2));';

    const actual = compiler(input);
    expect(actual).toBe(output);
  });
});
