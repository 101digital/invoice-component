import React, { memo, useContext } from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';

const THUMB_RADIUS = 12;

export type ThumbLabelProps = {
  value: number;
  labelFormat?: string;
  labelStyle?: StyleProp<TextStyle>;
  activeColor: string;
};

const ThumbLabel = ({ value, labelFormat, labelStyle, activeColor }: ThumbLabelProps) => {
  const { fonts } = useContext(ThemeContext);
  const label = labelFormat !== undefined ? labelFormat.replace('%d', value.toString()) : value;
  return (
    <View>
      <Text style={[styles.label, { color: activeColor, fontFamily: fonts.medium }, labelStyle]}>
        {label}
      </Text>
      <View style={[styles.root, { backgroundColor: activeColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
  label: {
    position: 'absolute',
    top: -THUMB_RADIUS - 5,
    left: -50,
    right: -50,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default memo(ThumbLabel);
