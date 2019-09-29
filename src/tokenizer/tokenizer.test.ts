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
});
