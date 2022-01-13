import React from 'react';
import { Text, View } from 'react-native';
import { InvoiceDescriptionComponentProps, InvoiceDescriptionComponentStyles } from './types';
import useMergeStyles from './theme';

const InvoiceDescriptionComponent = (props: InvoiceDescriptionComponentProps) => {
  const { description, style } = props;
  const styles: InvoiceDescriptionComponentStyles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.descriptionStyle}>{description}</Text>
    </View>
  );
};

export default InvoiceDescriptionComponent;
