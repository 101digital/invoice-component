import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ActionButtonComponentProps, ActionButtonComponentStyles } from './types';
import useMergeStyles from './theme';
import { ArrowRightIcon } from '../../assets';
import { ThemeContext } from 'react-native-theme-component';

const ActionButtonComponent = (props: ActionButtonComponentProps) => {
  const { title, onPressed, isLastItem, style, arrowRightIcon } = props;
  const styles: ActionButtonComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressed}
      style={[styles.containerStyle, { borderBottomWidth: isLastItem ? 1 : 0 }]}
    >
      <Text style={styles.titleStyle}>{title}</Text>
      {arrowRightIcon ?? <ArrowRightIcon size={12} color={colors.primaryColor} />}
    </TouchableOpacity>
  );
};

export default ActionButtonComponent;
