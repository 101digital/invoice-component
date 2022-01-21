import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchHeaderComponentProps, SearchHeaderComponentStyles } from './types';
import useMergeStyles from './theme';
import { BackIcon, SearchIcon, SettingsIcon } from '../../../assets';
import { ThemeContext } from 'react-native-theme-component';
import { debounce, isEmpty } from 'lodash';
import FilterModalComponent from '../filter-modal-component';
import { FilterTagName } from '../../../types';
import FilterBarComponent from '../filter-bar-component';

const SearchHeaderComponent = (props: SearchHeaderComponentProps) => {
  const {
    style,
    onBackPressed,
    searchIcon,
    placeholderColor,
    settingIcon,
    onSearch,
    currencyCode,
    backIcon,
    FilterBar,
    FilterModal,
    params,
  } = props;
  const styles: SearchHeaderComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const [key, setKey] = useState('');
  const [isShowFilterModal, setShowFilterModal] = useState(false);
  const [tags, setTags] = useState<FilterTagName[]>([]);

  const toggleFilterModal = () => setShowFilterModal(!isShowFilterModal);

  const _onSearch = useCallback(
    debounce(function (k) {
      onSearch({ ...params, keyword: k });
    }, 300),
    []
  );

  return (
    <>
      <View style={styles.containerStyle}>
        <View style={innerStyles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.leftButtonContainerStyle}
            onPress={onBackPressed}
          >
            {backIcon ?? <BackIcon color='#000000' />}
          </TouchableOpacity>
          <View style={styles.searchContainerStyle}>
            <View style={styles.iconSearchContainerStyle}>
              {searchIcon ?? <SearchIcon size={15} color={'#9B9BC5'} />}
            </View>
            <TextInput
              style={styles.searchTextStyle}
              value={key}
              onChangeText={(text) => {
                setKey(text);
                _onSearch(text);
              }}
              placeholder={i18n?.t('invoice_search_component.plh_search') ?? 'Search'}
              placeholderTextColor={placeholderColor ?? '#8b8b8b'}
              textAlignVertical='center'
              autoFocus
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.rightButtonContainerStyle}
            onPress={toggleFilterModal}
          >
            {settingIcon ?? <SettingsIcon size={18} color={colors.primaryColor} />}
            {!isEmpty(tags) && <View style={styles.activeFilterDotStyle} />}
          </TouchableOpacity>
        </View>
        {!isEmpty(tags) && (
          <FilterBarComponent
            tags={tags}
            params={params}
            onChanged={(p, t) => {
              onSearch({
                ...params,
                ...p,
              });
              setTags(t);
            }}
            style={FilterBar?.style}
            {...FilterBar?.props}
          />
        )}
      </View>
      <FilterModalComponent
        currencyCode={currencyCode}
        isVisible={isShowFilterModal}
        style={FilterModal?.style}
        onClose={toggleFilterModal}
        onApply={(_params, _tags) => {
          toggleFilterModal();
          onSearch({ ...params, ..._params });
          setTags(_tags);
        }}
        onCancel={toggleFilterModal}
        initParam={params}
        {...FilterModal?.props}
      />
    </>
  );
};

const innerStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default SearchHeaderComponent;
