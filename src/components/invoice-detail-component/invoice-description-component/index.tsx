import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { InvoiceDescriptionComponentProps, InvoiceDescriptionComponentStyles } from './types';
import useMergeStyles from './theme';
import { BottomSheet, ThemeContext } from 'react-native-theme-component';
import { BackIcon } from '../../../assets';

const InvoiceDescriptionComponent = (props: InvoiceDescriptionComponentProps) => {
  const { description, style, isVisible, onClose } = props;
  const styles: InvoiceDescriptionComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <BottomSheet
      isVisible={isVisible}
      animationIn='slideInRight'
      animationOut='slideOutRight'
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        containerStyle: {
          flex: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      }}
    >
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.backButtonContainerStyle}
          >
            <BackIcon color='#000000' />
          </TouchableOpacity>
          <Text style={styles.headerTitleStyle}>
            {i18n?.t('invoice_detail_component.lbl_invoice_description') ?? 'Invoice description'}
          </Text>
        </View>
        <Text style={styles.descriptionStyle}>{description}</Text>
      </SafeAreaView>
    </BottomSheet>
  );
};

export default InvoiceDescriptionComponent;
