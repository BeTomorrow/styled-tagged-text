import { FunctionComponent } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import ReactNative from "react-native";
import { renderReactElements } from "./react";

interface StyledTaggedTextProps extends TextProps {
	tagsStyle: Record<string, StyleProp<TextStyle>>;
	children?: string;
}

export const StyledTaggedText: FunctionComponent<StyledTaggedTextProps> = (props: StyledTaggedTextProps) => {
	const { children: inputText, tagsStyle = {}, ...other } = props;

	return renderReactElements(ReactNative.Text, other, inputText, tagsStyle);
};
