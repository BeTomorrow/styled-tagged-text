import React from "react";
import { renderReactElements } from "./react";

interface StyledTaggedSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
	removeUnknownTags?: boolean;
	tagsStyle: Record<string, React.CSSProperties>;
	children?: string;
}

export const StyledTaggedSpan = (props: StyledTaggedSpanProps) => {
	const { children: inputText, removeUnknownTags = false, tagsStyle = {}, ...other } = props;
	return renderReactElements("span", other, inputText, tagsStyle, removeUnknownTags);
};
