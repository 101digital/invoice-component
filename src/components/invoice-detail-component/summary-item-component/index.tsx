import React, { useContext } from 'react';
import { SummaryItemComponentProps, SummaryItemComponentStyles } from './types';
import useMergeStyles from './theme';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowRightIcon } from '../../../assets';
import { ThemeContext } from 'react-native-theme-component';

const SummaryItemComponent = (props: SummaryItemComponentProps) => {
  const {
    style,
    variant,
    title,
    amount,
    primaryColor,
    secondaryColor,
    subTitle,
    onPressedAmount,
    arrowRightIcon,
  } = props;
  const styles: SummaryItemComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _primaryColor = primaryColor ?? '#f4f8fb';
  const _secondaryColor = secondaryColor ?? '#ffffff';

  return (
    <View
      style={[
        styles.containerStyle,
        { backgroundColor: variant === 'primary' ? _primaryColor : _secondaryColor },
      ]}
    >
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleStyle}>
          {title}
          {subTitle && <Text style={styles.subTitleStyle}>{` ${subTitle}`}</Text>}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressedAmount}>
        <Text style={styles.amountStyle}>{amount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.arrowRightContainer}
        activeOpacity={0.8}
        onPress={onPressedAmount}
      >
        {onPressedAmount && (
          <>{arrowRightIcon ?? <ArrowRightIcon size={12} color={colors.primaryColor} />}</>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SummaryItemComponent;
