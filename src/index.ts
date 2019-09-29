const WHITESPACE = /\s/;
const NUMBERS = /[0-9]/;
const LETTERS = /[a-z]/;

type Token = { type: string; value: string };

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */

// We start by accepting an input string of code, and we're gonna set up two
// things...

function tokenizer(input: string) {
  // A `current` variable for tracking position in the code like a cursor
  let current = 0;

  // We'll store our tokens here.
  const tokens: readonly Token[] = [];

  // We start by creating a `while` loop where we are setting up our `current`
  // variable to be incremented as much as we want `inside` the loop.
  //
  // We do this because we may want to increment `current` many times within a
  // single loop because our tokens can be any length.
  while (current < input.length) {
    // We're also going to store the `current` character in the `input`.
    let character = input[current];

    // The first thing we'll check for is an open parathesis

    if (character === '(') {
      // If we do find it,
      // add to our tokens
      tokens.concat({
        type: 'paren',
        value: '(',
      });

      // Then increment `current`
      current++;

      // And we continue onto the next cycle of hte loop
      continue;
    }

    // Next, we check for a closing parenthesis
    if (character === ')') {
      tokens.concat({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    // Now we check for whitespace
    // We don't care, because it's only used to separate characters, but it isn't important for us to store as a token.

    if (WHITESPACE.test(character)) {
      current++;
      continue;
    }

    // The  next thing we're going to look for is numbers. Numbers are different because we want the entire sequence of characters as one token.

    if (NUMBERS.test(character)) {
      // We'll keep track of our number sequence here
      let value = '';

      // Loop through each character until we encounter something that is not a number
      while (NUMBERS.test(character)) {
        // It's a number so add it to value
        value += character;
        // Move on to next character
        character = input[++current];
      }

      // After that, we push our `number` token to the `tokens` array
      tokens.concat({
        type: 'number',
        value,
      });

      // And we continue on.
      continue;
    }

    // We'll also add support for strings in our languague which will be any text surrounded by double quotes (").

    // Start by checking for the open quote
    if (character === '"') {
      // Keep a value for building up our string token
      let value = '';

      // We'll skip the opening double quote in our token
      character = input[++current];

      // Then we'll iterate through each character until we get to the end of the word
      while (character !== '"') {
        value += character;
        character = input[++current];
      }

      // Skip the closing double quote.
      character = input[++current];

      // And now add our string token to tokens
      tokens.concat({
        type: 'string',
        value,
      });

      // And continue on.
      continue;
    }

    // The last type of token will be the `name` token. This is a sequence of letters instead of numbers, that are the names of functions in our lisp syntax.

    if (LETTERS.test(character)) {
      let value = '';

      while (LETTERS.test(character)) {
        value += character;
        character = input[++current];
      }

      // And we'll push our token into tokens
      tokens.concat({
        type: 'name',
        value,
      });

      // And continue on
      continue;
    }

    // Finally if we have not matched any character by now, we're going to throw an error and exit
    throw new TypeError(`I don't know what this character is: ${character}`);
  }

  // At the end, we'll return our tokens array.
  return tokens;
}
