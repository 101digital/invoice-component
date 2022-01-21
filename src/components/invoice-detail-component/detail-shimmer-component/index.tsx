import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { DetailShimmerComponentProps, DetailShimmerComponentStyles } from './types';
import useMergeStyles from './theme';
import { BackIcon } from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DetailShimmerComponent = (props: DetailShimmerComponentProps) => {
  const { style, backIcon, onBackPressed } = props;

  const styles: DetailShimmerComponentStyles = useMergeStyles(style);

  const _renderLineItem = () => {
    return (
      <>
        <View style={styles.rowItemContainerStyle}>
          <ShimmerPlaceHolder style={styles.itemNameShimmerStyle} />
          <ShimmerPlaceHolder style={styles.itemPriceShimmerStyle} />
        </View>
        <ShimmerPlaceHolder style={styles.itemQuantityShimmerStyle} />
      </>
    );
  };

  const _renderSummary = () => {
    return (
      <>
        <View style={styles.rowItemContainerStyle}>
          <ShimmerPlaceHolder style={styles.summaryTitleShimmerStyle} />
          <ShimmerPlaceHolder style={styles.summaryPriceShimmerStyle} />
        </View>
        <ShimmerPlaceHolder style={styles.summaryExtensionShimmerStyle} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.appBarContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={onBackPressed}
          style={styles.backButtonContainerStyle}
        >
          {backIcon ?? <BackIcon color="#000000" />}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainerStyle}>
        <View style={styles.headerContainerStyle}>
          <View style={styles.rowItemContainerStyle}>
            <>
              <ShimmerPlaceHolder style={styles.numberShimmerStyle} />
              <ShimmerPlaceHolder style={styles.versionShimmerStyle} />
            </>
            <View style={styles.rowItemContainerStyle} />
            <View style={styles.qrContainerStyle}>
              <ShimmerPlaceHolder style={styles.qrShimmerStyle} />
            </View>
          </View>
          <View style={styles.headerContentContainerStyle}>
            <View style={styles.rowItemContainerStyle}>
              <ShimmerPlaceHolder style={styles.dateTitleShimmerStyle} />
              <ShimmerPlaceHolder style={styles.dateValueShimmerStyle} />
            </View>
            <View style={styles.rowItemContainerStyle}>
              <ShimmerPlaceHolder style={styles.dateTitleShimmerStyle} />
              <ShimmerPlaceHolder style={styles.dateValueShimmerStyle} />
            </View>
            <View style={styles.rowItemContainerStyle}>
              <ShimmerPlaceHolder style={styles.customerTitleShimmerStyle} />
              <ShimmerPlaceHolder style={styles.customerValueShimmerStyle} />
            </View>
            <View style={styles.rowItemContainerStyle}>
              <ShimmerPlaceHolder style={styles.statusTitleShimmerStyle} />
              <ShimmerPlaceHolder style={styles.statusValueShimmerStyle} />
            </View>
          </View>
        </View>
        <ShimmerPlaceHolder style={styles.itemLabelShimmerStyle} />
        {_renderLineItem()}
        {_renderLineItem()}
        {_renderSummary()}
        {_renderLineItem()}
        {_renderSummary()}
        {_renderLineItem()}
        {_renderSummary()}
        {_renderLineItem()}
        {_renderSummary()}
        {_renderLineItem()}
      </ScrollView>
      <View style={styles.footerContainerStyle}>
        <ShimmerPlaceHolder style={styles.buttonShimmerStyle} />
        <ShimmerPlaceHolder style={styles.buttonShimmerStyle} />
      </View>
    </SafeAreaView>
  );
};

export default DetailShimmerComponent;
