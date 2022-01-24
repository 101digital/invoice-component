import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { FooterComponentProps, FooterComponentStyles } from './types';
import useMergeStyles from './theme';
import { Button, ThemeContext } from 'react-native-theme-component';

const FooterComponent = (props: FooterComponentProps) => {
  const {
    onNextPressed,
    canBack,
    canNext,
    onBackPressed,
    nextButtonTitle,
    backButtonTitle,
    amountLabel,
    amountValue,
    style,
    isLoading,
  } = props;
  const styles: FooterComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {amountLabel && amountValue && (
        <View style={styles.amountContainerStyle}>
          <Text style={styles.amountLabelStyle}>{amountLabel}</Text>
          <Text style={styles.amountValueStyle}>{amountValue}</Text>
        </View>
      )}
      <View style={styles.buttonContainerStyle}>
        <Button
          label={backButtonTitle ?? i18n?.t('create_invoice_component.btn_cancel') ?? 'Cancel'}
          onPress={onBackPressed}
          variant="secondary"
          disabled={!canBack || isLoading}
          style={
            style?.backButtonStyle ?? {
              secondaryContainerStyle: {
                flex: 1,
                marginRight: 7.5,
              },
            }
          }
        />
        <Button
          label={nextButtonTitle ?? i18n?.t('create_invoice_component.btn_next') ?? 'Next'}
          onPress={onNextPressed}
          disabled={!canNext}
          isLoading={isLoading}
          style={
            style?.nextButtonStyle ?? {
              primaryContainerStyle: {
                flex: 1,
                marginLeft: 7.5,
              },
            }
          }
        />
      </View>
    </View>
  );
};

FooterComponent.defaultProps = {
  canBack: true,
};

export default FooterComponent;
