import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { DetailShimmerComponentStyles } from './types';

const useMergeStyles = (style?: DetailShimmerComponentStyles): DetailShimmerComponentStyles => {
  const defaultStyles: DetailShimmerComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      flex: 1,
    },
    backButtonContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    headerContainerStyle: {
      backgroundColor: '#fff',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      padding: 15,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      elevation: 2,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      zIndex: 5,
    },
    rowItemContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      alignItems: 'center',
    },
    numberShimmerStyle: {
      width: '30%',
      height: 20,
      borderRadius: 4,
      marginRight: 5,
    },
    versionShimmerStyle: {
      width: '5%',
      height: 20,
      borderRadius: 4,
      marginRight: 5,
    },
    qrContainerStyle: {
      borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 5,
      marginLeft: 15,
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qrShimmerStyle: {
      width: '100%',
      borderRadius: 4,
      aspectRatio: 1,
    },
    headerContentContainerStyle: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#f4f8fb',
      borderRadius: 5,
      marginTop: 15,
    },
    dateTitleShimmerStyle: {
      width: '30%',
      height: 10,
      borderRadius: 4,
      marginVertical: 6,
    },
    dateValueShimmerStyle: {
      width: '20%',
      height: 10,
      borderRadius: 4,
    },
    customerTitleShimmerStyle: {
      width: '35%',
      height: 10,
      borderRadius: 4,
      marginVertical: 6,
    },
    customerValueShimmerStyle: {
      width: '10%',
      height: 10,
      borderRadius: 4,
      marginVertical: 6,
    },
    statusTitleShimmerStyle: {
      width: '30%',
      height: 10,
      borderRadius: 4,
      marginVertical: 6,
    },
    statusValueShimmerStyle: {
      width: '20%',
      height: 10,
      borderRadius: 4,
      marginVertical: 6,
    },
    footerContainerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 10,
      elevation: 5,
      paddingVertical: 10,
      flexDirection: 'row',
      paddingHorizontal: 7.5,
    },
    buttonShimmerStyle: {
      flex: 1,
      height: 45,
      borderRadius: 4,
      marginHorizontal: 7.5,
    },
    itemLabelShimmerStyle: {
      width: '10%',
      height: 15,
      borderRadius: 4,
      margin: 15,
    },
    itemNameShimmerStyle: {
      width: '35%',
      height: 10,
      borderRadius: 4,
      marginLeft: 15,
      marginVertical: 5,
    },
    itemPriceShimmerStyle: {
      width: '5%',
      height: 10,
      borderRadius: 4,
      marginRight: 20,
    },
    itemQuantityShimmerStyle: {
      width: '5%',
      height: 10,
      borderRadius: 4,
      marginVertical: 5,
      marginLeft: 15,
    },
    summaryTitleShimmerStyle: {
      width: '35%',
      height: 15,
      borderRadius: 4,
      marginLeft: 15,
      marginTop: 20,
      marginBottom: 5,
    },
    summaryPriceShimmerStyle: {
      width: '15%',
      height: 15,
      borderRadius: 4,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 5,
    },
    summaryExtensionShimmerStyle: {
      width: '5%',
      height: 10,
      borderRadius: 4,
      marginLeft: 15,
      marginVertical: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
