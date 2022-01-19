import React, { forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
// @ts-ignore
import Slider from 'rn-range-slider';
import Thumb from './thumb';
import Rail from './rail';
import RailSelected from './rail-selected';
import ThumbLabel from './thumb-label';
import { ThemeContext } from 'react-native-theme-component';

export type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  initLow?: number;
  initHigh?: number;
  disableRange?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  inActiveColor?: string;
  floatingLabel?: boolean;
  onValueChanged: (low: number, high: number, fromUser: boolean) => void;
  onTouch?: (moving: boolean) => void;
  labelFormat?: string;
  labelStyle?: StyleProp<TextStyle>;
};

const RangeSliderComponent = forwardRef((props: RangeSliderProps, ref) => {
  const {
    min,
    max,
    step,
    initLow,
    initHigh,
    style,
    onValueChanged,
    disableRange,
    disable,
    onTouch,
    floatingLabel,
    labelStyle,
    labelFormat,
    activeColor,
    inActiveColor,
  } = props;
  const { colors } = useContext(ThemeContext);
  const [low, setLow] = useState(initLow);
  const [high, setHigh] = useState(initHigh);
  const _activeColor = activeColor ?? colors.primaryColor;
  const _inActiveColor = inActiveColor ?? '#dcdcdc';

  const renderThumb = useCallback(() => <Thumb activeColor={_activeColor!} />, []);
  const renderThumbLabel = useCallback(() => {
    return (
      <ThumbLabel
        activeColor={_activeColor!}
        value={low ?? 0}
        labelFormat={labelFormat}
        labelStyle={labelStyle}
      />
    );
  }, [low]);
  const renderRail = useCallback(() => <Rail inActiveColor={_inActiveColor!} />, []);
  const renderRailSelected = useCallback(() => <RailSelected activeColor={_activeColor!} />, []);

  const handleValueChange = useCallback((_low, _high, fromUser) => {
    setLow(_low);
    setHigh(_high);
    onValueChanged(_low, _high, fromUser);
  }, []);

  const updateLowValue = (value: number) => {
    setLow(value);
    onValueChanged(value, high ?? 0, false);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        updateLowValue: updateLowValue,
      };
    },
    []
  );

  return (
    <Slider
      style={style}
      min={min}
      max={max}
      low={low}
      high={high}
      step={step}
      renderThumb={floatingLabel ? renderThumbLabel : renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      disableRange={disableRange}
      disable={disable}
      floatingLabel={false}
      onValueChanged={handleValueChange}
      onTouchStart={() => onTouch && onTouch(true)}
      onTouchEnd={() => onTouch && onTouch(false)}
    />
  );
});

RangeSliderComponent.defaultProps = {
  floatingLabel: false,
  disableRange: false,
  disable: false,
  style: {
    width: '100%',
    height: 30,
  },
};

export default RangeSliderComponent;
