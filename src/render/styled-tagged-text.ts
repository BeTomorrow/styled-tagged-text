import { StyleProp, TextProps, TextStyle } from "react-native";
import { renderReactElements } from "./react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactNative = require("react-native");

interface StyledTaggedTextProps extends TextProps {
	removeUnknownTags?: boolean;
	tagsStyle: Record<string, StyleProp<TextStyle>>;
	children?: string;
}

export function StyledTaggedText(props: StyledTaggedTextProps) {
	const { children: inputText, removeUnknownTags = false, tagsStyle = {}, ...other } = props;

	return renderReactElements(reactNative.Text, other, inputText, tagsStyle, removeUnknownTags);
}
