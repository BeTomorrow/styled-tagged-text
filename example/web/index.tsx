import * as React from "react";
import { CSSProperties, useState } from "react";
import * as ReactDOM from "react-dom";
import { StyledTaggedSpan } from "../..";

const tagsStyle: Record<string, CSSProperties> = {
	b: { fontWeight: "bold" },
	i: { fontStyle: "italic" },
	emph: { color: "#eb4034", fontSize: 16 },
};
const App = () => {
	const [removeUnknownTags, setRemoveUnknownTags] = useState(false);
	const text = "Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph] [unknown]Unknown[/unknown]";
	return (
		<div style={{ flexDirection: "column", margin: 10 }}>
			<div style={styles.h4}>Code</div>
			<div style={styles.codeBlock}>
				<pre>{text}</pre>
			</div>
			<div style={styles.h4}>Style</div>
			<div style={styles.codeBlock}>
				<pre>{JSON.stringify(tagsStyle)}</pre>
			</div>
			<div style={styles.h4}>Render</div>
			<div style={styles.block}>
				<StyledTaggedSpan tagsStyle={tagsStyle} removeUnknownTags={removeUnknownTags}>
					{text}
				</StyledTaggedSpan>
			</div>
			<div>
				<input
					type="checkbox"
					id="unknown-tags"
					name="unknown-tags"
					checked={removeUnknownTags}
					onChange={(e) => setRemoveUnknownTags((b) => !b)}
				/>
				<label htmlFor="unknown-tags">Remove unkown tags</label>
			</div>
		</div>
	);
};
const styles: Record<string, CSSProperties> = {
	h4: { fontWeight: "bold", fontSize: 24 },
	block: { marginBottom: 20, marginTop: 20 },
	codeBlock: { flexDirection: "column", padding: 20, backgroundColor: "#f2f2f2", marginBottom: 20, marginTop: 20 },
};
ReactDOM.render(<App />, document.getElementById("root"));
