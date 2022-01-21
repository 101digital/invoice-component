import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { BackIcon } from '../../../assets';
import { useScroller } from '../scroll-provider-component';
import useMergeStyles from './theme';
import { DetailHeaderComponentProps, DetailHeaderComponentStyles } from './types';

const DetailHeaderComponent = (props: DetailHeaderComponentProps) => {
  const { onBackPressed, style, backIcon, invoiceNumber, headerRight, actionButtonWidth } = props;
  const styles: DetailHeaderComponentStyles = useMergeStyles(style);
  const { titleShowing, opacity } = useScroller();
  const [titleFade] = useState(new Animated.Value(0));
  const _actionButtonWidth = actionButtonWidth ?? 55;

  useEffect(() => {
    titleShowing === false &&
      Animated.timing(titleFade, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    titleShowing === true &&
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
  });

  return (
    <View
      style={[
        styles.containerStyle,
        {
          shadowOpacity: opacity / 2,
          elevation: opacity * 2,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.headerLeftContainerStyle, { width: _actionButtonWidth }]}
        onPress={onBackPressed}
      >
        {backIcon ?? <BackIcon color="#000000" />}
      </TouchableOpacity>
      {opacity === 1 ? (
        <Animated.View style={[styles.titleContainerStyle, { opacity: titleFade }]}>
          <Text style={styles.collapsedTitleStyle}>{`#${invoiceNumber}`}</Text>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.titleContainerStyle,
            {
              opacity: 1 - opacity,
              marginTop: 1 - opacity * 100,
            },
          ]}
        >
          <Text style={styles.expandedTitleStyle}>{`#${invoiceNumber}`}</Text>
        </Animated.View>
      )}
      <View style={[styles.headerRightContainerStyle, { width: _actionButtonWidth }]}>
        {headerRight}
      </View>
    </View>
  );
};

export default DetailHeaderComponent;
