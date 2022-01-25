import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FilterBarComponentProps, FilterBarComponentStyles } from './types';
import useMergeStyles from './theme';
import { CloseIcon } from '../../../assets';
import { InvoiceParam } from '../../../types';
import { ThemeContext } from 'react-native-theme-component';

const FilterBarComponent = (props: FilterBarComponentProps) => {
  const { style, tags, params, onChanged, closeIcon } = props;
  const styles: FilterBarComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  const _renderTag = (value: string, onDelete: () => void) => {
    return (
      <TouchableOpacity
        key={value}
        activeOpacity={0.8}
        style={styles.itemContainerStyle}
        onPress={onDelete}
      >
        <Text style={styles.itemTextStyle}>{value}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onDelete}
          style={styles.itemCloseButtonStyle}
        >
          {closeIcon ?? <CloseIcon size={8} />}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>
        {i18n?.t('invoice_search_component.lbl_filtered_by') ?? 'Filtered by'}
      </Text>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tags.map((item) =>
          _renderTag(item.value, () => {
            let _param: InvoiceParam;
            if (item.id === 'status') {
              _param = { ...params, searchStatus: undefined };
            } else if (item.id === 'date') {
              _param = { ...params, fromDate: undefined, toDate: undefined };
            } else {
              _param = { ...params, fromTotalAmount: undefined, toTotalAmount: undefined };
            }
            onChanged(
              _param,
              tags.filter((i) => i.id !== item.id)
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default FilterBarComponent;
