import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { MoneyBoxComponentProps, MoneyBoxComponentStyles } from './types';
import useMergeStyles from './theme';
import { MoneyIcon } from '../../assets';
import { ThemeContext } from 'react-native-theme-component';

const MoneyBoxComponent = (props: MoneyBoxComponentProps) => {
  const { label, value, style, rightIcon } = props;
  const styles: MoneyBoxComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.labelStyle}>{label}</Text>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.1}
          numberOfLines={1}
          style={styles.valueStyle}
        >
          {value}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {rightIcon ?? <MoneyIcon color={colors.primaryColor} />}
      </View>
    </View>
  );
};

export default MoneyBoxComponent;
