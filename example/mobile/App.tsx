import {StyledTaggedText} from '@betomorrow/styled-tagged-text';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const App = () => {
  const [isDarkMode, setDarkMode] = useState(useColorScheme() === 'dark');
  const [input, setInput] = useState(
    'Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i] [emph]Emphasize[/emph]',
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const textStyle = {color: isDarkMode ? Colors.lighter : Colors.darker};

  return (
    <View style={[styles.screen, backgroundStyle]}>
      <SafeAreaView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
        <ScrollView style={backgroundStyle}>
          <View style={styles.switchContainer}>
            <Text style={textStyle}>Light</Text>
            <Switch
              value={isDarkMode}
              onValueChange={val => setDarkMode(val)}
            />
            <Text style={textStyle}>Dark</Text>
          </View>

          <View
            style={[
              {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              },
              styles.container,
            ]}>
            <Text style={textStyle}>Text input</Text>
            <TextInput
              value={input}
              onChangeText={setInput}
              multiline
              style={textStyle}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              },
              styles.container,
            ]}>
            <Text style={textStyle}>Render</Text>
            <StyledTaggedText tagsStyle={inlineStyles} style={textStyle}>
              {input}
            </StyledTaggedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const inlineStyles = StyleSheet.create({
  b: {fontWeight: '700'},
  i: {fontStyle: 'italic'},
  emph: {color: '#eb4034', fontSize: 16},
});

const styles = StyleSheet.create({
  screen: {flex: 1},
  container: {
    flexDirection: 'column',
    margin: 20,
    padding: 10,
    borderRadius: 5,
  },
  switchContainer: {flexDirection: 'row', marginHorizontal: 20, marginTop: 10},
});

export default App;
