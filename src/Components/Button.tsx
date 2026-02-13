import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
};

const GetStartedButton = ({
  title,
  onPress,
  backgroundColor = '#A3B65A',
  textColor = '#000',
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: backgroundColor } as ViewStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor } as TextStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default GetStartedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
