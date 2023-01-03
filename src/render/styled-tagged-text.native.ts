import { FunctionComponent } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import { renderReactElements } from "./react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactNative = require("react-native");

interface StyledTaggedTextProps extends TextProps {
	tagsStyle: Record<string, StyleProp<TextStyle>>;
	children?: string;
}

export const StyledTaggedText: FunctionComponent<StyledTaggedTextProps> = (props: StyledTaggedTextProps) => {
	const { children: inputText, tagsStyle = {}, ...other } = props;

	return renderReactElements(reactNative.Text, other, inputText, tagsStyle);
};
