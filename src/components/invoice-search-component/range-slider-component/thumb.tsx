import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

const THUMB_RADIUS = 12;

export type ThumbProps = {
  activeColor: string;
};

const Thumb = ({ activeColor }: ThumbProps) => {
  return <View style={[styles.root, { borderColor: activeColor }]} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
});

export default memo(Thumb);
