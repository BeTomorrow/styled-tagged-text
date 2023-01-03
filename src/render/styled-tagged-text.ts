import { StyledTaggedText as StyledTaggedTextRN } from "./styled-tagged-text.native";

export const StyledTaggedText: typeof StyledTaggedTextRN = () => {
	throw new Error("StyledTaggedText is only available on react-native. Use StyledTaggedSpan for Web");
};
