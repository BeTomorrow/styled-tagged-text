import { StyledTaggedText } from "@betomorrow/styled-tagged-text/native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const App = () => {
	const [isDarkMode, setDarkMode] = useState(useColorScheme() === "dark");
	const [ignoreUnknownTags, setIgnoreUnknownTags] = useState(false);

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};
	const textStyle = { color: isDarkMode ? Colors.lighter : Colors.darker };

	return (
		<View style={[styles.screen, backgroundStyle]}>
			<SafeAreaView>
				<StatusBar
					barStyle={isDarkMode ? "light-content" : "dark-content"}
					backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
				/>
				<ScrollView style={backgroundStyle}>
					<View style={styles.switchContainer}>
						<Text style={textStyle}>Light</Text>
						<Switch value={isDarkMode} onValueChange={val => setDarkMode(val)} />
						<Text style={textStyle}>Dark</Text>
					</View>
					<View style={styles.switchContainer}>
						<Text style={textStyle}>Ignore unknown tag</Text>
						<Switch value={ignoreUnknownTags} onValueChange={val => setIgnoreUnknownTags(val)} />
					</View>

					<View
						style={[
							{
								backgroundColor: isDarkMode ? Colors.black : Colors.white,
							},
							styles.container,
						]}>
						<Text style={textStyle}>Test</Text>
						<StyledTaggedText tagsStyle={inlineStyles} style={textStyle} removeUnknownTags={ignoreUnknownTags}>
							Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]
						</StyledTaggedText>
						<StyledTaggedText tagsStyle={inlineStyles} style={textStyle} removeUnknownTags={ignoreUnknownTags}>
							[unknown]Unknown tag[/unknown]
						</StyledTaggedText>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

/* eslint-disable react-native/no-unused-styles */
const inlineStyles = StyleSheet.create({
	b: { fontWeight: "700" },
	i: { fontStyle: "italic" },
	emph: { color: "#eb4034", fontSize: 16 },
});

const styles = StyleSheet.create({
	screen: { flex: 1 },
	container: {
		flexDirection: "column",
		margin: 20,
		padding: 10,
		borderRadius: 5,
	},
	switchContainer: { flexDirection: "row", marginHorizontal: 20, marginTop: 10 },
});

export default App;
