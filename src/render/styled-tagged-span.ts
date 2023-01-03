import { FunctionComponent } from "react";
import { renderReactElements } from "./react";

interface StyledTaggedSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
	tagsStyle: Record<string, React.CSSProperties>;
	children?: string;
}

export const StyledTaggedSpan: FunctionComponent<StyledTaggedSpanProps> = (props: StyledTaggedSpanProps) => {
	const { children: inputText, tagsStyle = {}, ...other } = props;
	return renderReactElements("span", other, inputText, tagsStyle);
};
