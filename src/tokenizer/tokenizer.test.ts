import { tokenizer } from './';

describe('tokenizer', () => {
  it('should return a token when the code contains a paren', () => {
    const code = '(';
    const actual = tokenizer(code);
    // It should return an array of tokens
    expect(Array.isArray(actual)).toBe(true);

    // There should be at least one token
    expect(actual).toHaveLength(1);
  });
  it('should return a token when the code contains a number', () => {
    const code = '2';
    const actual = tokenizer(code);
    // It should return an array of tokens
    expect(Array.isArray(actual)).toBe(true);

    // There should be at least one token
    expect(actual).toHaveLength(1);
  });
  it('should return a token when the code contains a string', () => {
    const code = '"joe"';
    const actual = tokenizer(code);
    // It should return an array of tokens
    expect(Array.isArray(actual)).toBe(true);

    // There should be at least one token
    expect(actual).toHaveLength(1);
  });
  it('should throw an error if it doesnt recognize the character', () => {
    const code = '$';
    const actual = () => tokenizer(code);
    expect(actual).toThrowError();
  });
  it('should turn `input` string into `tokens` array', () => {
    const input = '(add 2 (subtract 4 2))';
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

    const actual = tokenizer(input);
    expect(actual).toMatchObject(tokens);
  });
});
