import { performance } from "perf_hooks";
import { toAst } from "../src/ast";
import { lexer } from "../src/lexer";

function benchmark(label: string, iterations: number, f: () => void) {
	console.time(label);
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		f();
	}
	const end = performance.now();
	console.timeEnd(label);
	console.log(`${label} took an average of ${(end - start) / iterations}ms per iteration`);
}

const input =
	"[b][i]This is a[/i] test of [u]many nested[/u] tags and additional tags\
     [s]randomly placed[/s] on words in a text.[/b] [color]It has at least 10\
      tags[/color], with the tags placed more [s]randomly throughout[/s] the text and\
       no tags [u]having parameters[/u], with tags placed [r]approximately[/r] every 2-5 words.\
        This is [font]just a test[/font] to see how well the BBcode [img]parser[/img]\
         handles a large number of tags.";
benchmark("Lexer", 10000, () => lexer(input));
benchmark("Ast", 10000, () => toAst(input));
