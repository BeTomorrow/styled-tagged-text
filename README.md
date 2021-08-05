# Styled Tagged Text

Text component for React and React-Native application. Apply custom styles on specifics parts of your text, by enclosing them with bracket tags. Typically useful when using internationalization.

## Usage

### Installation

```bash
npm install @betomorrow/styled-tagged-text
```

### React-native component

```tsx
// style
const tagsStyle = StyleSheet.create({
	b: { fontWeight: "700" },
	i: { fontStyle: "italic" },
	emph: { color: "#eb4034", fontSize: 16 },
});

// Component
import { StyledTaggedText } from "@betomorrow/styled-tagged-text/native";

<StyledTaggedText tagsStyle={tagsStyle}>
	Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]
</StyledTaggedText>;
```

Render:

![Render](https://github.com/BeTomorrow/styled-tagged-text/blob/main/asset/render.png?raw=true)

<!-- IMG -->

Use `<StyledTaggedText>` exactly like a `<Text>` components.

### Properties

- `removeUnknownTags`: By default, tags with no associated style are treated and displayed as text. Setting to _true_, tags are always removed from the text.
- All `Text` (`span` on web) properties.

### React component

```tsx
// Define your style
const tagsStyle = {
	b: { fontWeight: "bold" },
	i: { fontStyle: "italic" },
	emph: { color: "#eb4034", fontSize: 16 },
};

// Component
import { StyledTaggedSpan } from "@betomorrow/styled-tagged-text";

<StyledTaggedSpan tagsStyle={tagsStyle}>
	Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]
</StyledTaggedSpan>;
```

Use `<StyledTaggedSpan>` exactly like a `<span>` components.

## How it works ?

Underneath, `StyledTaggedText` (`StyledTaggedSpan` on web) are just nested `Text` (`span`) components with inline style. They have the exact same behavior, so you can transmit props as well.

```TSX
<StyledTaggedSpan
	tagsStyle={{ b: { fontWeight: "bold" }, i: { fontStyle: "italic" }, emph: { color: "#eb4034", fontSize: 16 } }}>
	Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]
</StyledTaggedSpan>
```

Will render exactly:

```html
<span>
	Normal
	<span style="font-weight: bold;">Bold</span>
	<span style="font-style: italic;">
		<span style="font-weight: bold;">Bold Italic</span>
		Italic
	</span>
	<span style="color: rgb(235, 64, 52); font-size: 16px;">Emphasize</span>
</span>
```

## Example Playground

[CodeBox Playground](https://codesandbox.io/s/styled-tagged-text-qb8gf?file=/src/App.tsx)

## Tips

Define a global style and create wrap our component to easily re-use the same stylesheet and tags.

```TSX
import { TextProps } from "react-native";
import { StyledTaggedText } from "@betomorrow/styled-tagged-text/native";

const globalStyle = {
	emph: { color: "#eb4034", fontWeight: "bold" },
};

export const MyStyledText = (props: TextProps) => <StyledTaggedText tagsStyle={globalStyle} {...props} />;
```

And everywhere else in your app:

```TSX
<MyStyledText>Super [emph]cool ![/emph]</MyStyledText>
```
