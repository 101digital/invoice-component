import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

export type RailProps = {
  inActiveColor: string;
};

const Rail = ({ inActiveColor }: RailProps) => {
  return <View style={[styles.root, { backgroundColor: inActiveColor }]} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
});
