import { tokenizer } from '../tokenizer/index';
import { parser } from '../parser/index';
import { transformer } from '../transformer/index';
import { codeGenerator } from '../codeGenerator/index';

export function compiler(input: string) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // and simply return the output!
  return output;
}
