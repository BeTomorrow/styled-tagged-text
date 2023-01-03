import { lexer } from "./lexer";
import { parser } from "./parser";

export const toAst = (input: string) => [...parser(lexer(input))];
