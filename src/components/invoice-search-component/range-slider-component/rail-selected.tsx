import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

export type RailSelectedProps = {
  activeColor: string;
};

const RailSelected = ({ activeColor }: RailSelectedProps) => {
  return <View style={[styles.root, { backgroundColor: activeColor }]} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
  },
});
