import React from 'react';
import { HeaderComponentProps, HeaderComponentStyles } from './types';
import useMergeStyles from './theme';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { BackIcon } from '../../../assets';

const HeaderComponent = (props: HeaderComponentProps) => {
  const { activeStep, style, headerTitle, onGoBack, backIcon, steps } = props;
  const styles: HeaderComponentStyles = useMergeStyles(style);
  const _backButtonWidth = StyleSheet.flatten(styles.backButtonContainerStyle).width ?? 0;

  return (
    <View style={styles.containerStyle}>
      <View style={styles.appBarContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onGoBack}
          style={styles.backButtonContainerStyle}
        >
          {backIcon ?? <BackIcon color="#000000" />}
        </TouchableOpacity>
        <Text style={[styles.headerTitleStyle, { marginRight: _backButtonWidth }]}>
          {headerTitle}
        </Text>
      </View>
      <View style={styles.stepContainerStyle}>
        {steps.map((_, index) => {
          const isCurrent = activeStep === index;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const isActived = activeStep >= index;
          return (
            <View key={index.toString()} style={innerStyles.stepWrapper}>
              <View
                style={[
                  isActived ? styles.activeLineStyle : styles.inActiveLineStyle,
                  isFirst ? { backgroundColor: 'transparent' } : {},
                ]}
              />
              <View
                style={[
                  isActived ? styles.activeStepContainerStyle : styles.inActiveStepContainerStyle,
                  isCurrent ? styles.currentStepContainerStyle : {},
                ]}
              >
                <Text
                  style={[
                    isActived ? styles.activeStepNumberStyle : styles.inActiveStepNumberStyle,
                    isCurrent ? styles.currentStepNumberStyle : {},
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
              <View
                style={[
                  activeStep > index ? styles.activeLineStyle : styles.inActiveLineStyle,
                  isLast ? { backgroundColor: 'transparent' } : {},
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labelContainerStyle}>
        {steps.map((step, index) => (
          <Text
            key={index.toString()}
            style={activeStep >= index ? styles.activeLabelStyle : styles.inActiveLabelStyle}
          >
            {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  stepWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HeaderComponent;
