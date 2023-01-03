# Styled Tagged Text

Text component for React and React-Native application. Apply custom styles on specifics parts of your text, by enclosing them with bracket tags. Typically useful when using internationalization.

## Features

- **🧘 Easy to use**: Define a StyleSheet and the style will be applied to all text enclosed with tags, using keys as tag name.
- **👩‍💻 Web and 📱 Mobile**: Use everywhere. You can use the same logic to apply rich text in your website and in your React-Native mobile app.
- **🛠 TypeScript support**: styled-tagged-text is written entirely in TypeScript
- **🐥 Lightweight**: Small library with no dependency resulting in a [5kb bundle](https://bundlephobia.com/package/betomorrow/styled-tagged-text)

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
import { StyledTaggedText } from "@betomorrow/styled-tagged-text";

<StyledTaggedText tagsStyle={tagsStyle}>
	Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]
</StyledTaggedText>;
```

Render:

![Render](https://github.com/BeTomorrow/styled-tagged-text/blob/main/asset/render.png?raw=true)

<!-- IMG -->

Use `<StyledTaggedText>` exactly like a `<Text>` components.

### Properties

- `tagsStyle` : A record of style. Keys correspond to the tag name.
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

React-Native and Web demo are available in `example` folder

## Tips

Define a global style and wrap our component to easily re-use the same stylesheet and tags.

```TSX
import { StyledTaggedText } from "@betomorrow/styled-tagged-text";
import React from "react";
import { StyleSheet, TextProps } from "react-native";

interface StyledTextProps extends TextProps {
	children?: string;
}

export const StyledText = (props: StyledTextProps) => {
	const { children, ...otherProps } = props;
	return (
		<StyledTaggedText tagsStyle={tagsStyle} {...otherProps}>
			{children}
		</StyledTaggedText>
	);
};

const tagsStyle = StyleSheet.create({
	emph: {
		color: "#1b66e4",
	},
});

```

And everywhere else in your app:

```TSX
<StyledText>Super [emph]cool ![/emph]</StyledText>
```
